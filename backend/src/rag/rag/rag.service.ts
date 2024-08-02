import { Injectable } from '@nestjs/common';
import { END, MemorySaver, START, StateGraph } from '@langchain/langgraph';
import { OllamaService } from 'src/ollama/ollama.service';
import * as hub from 'langchain/hub';
import { StringOutputParser } from '@langchain/core/output_parsers';
import type { Document } from '@langchain/core/documents';
import { RetrieverService } from '../retriever/retriever.service';
import { Utils } from '../utils/utils';
import { RetrievalGrader } from '../retrieval-grader/retrieval-grader';
import { AnswerRewriter } from '../answer-re-writer/answer-re-writer';
import { QuestionRouter } from '../question-router/question-router';
import { AnswerGrader } from '../answer-grader/answer-grader';

interface RAGState {
  question: string;
  generation: string;
  documents: Document[];
}

@Injectable()
export class RagService {
  ragChain: any;
  graph: any;
  retrievalGrader: any;
  answerRewriter: any;
  questionRouter: any;
  answerGrader: any;

  constructor(
    private ollamaService: OllamaService,
    private retrieverService: RetrieverService,
  ) {
    hub.pull('sde/rag-prompt').then((module) => {
      this.ragChain = module
        .pipe(this.ollamaService.chat)
        .pipe(new StringOutputParser());
    });

    this.answerRewriter = new AnswerRewriter(this.ollamaService.chat);
    this.retrievalGrader = new RetrievalGrader(this.ollamaService.chat);
    this.questionRouter = new QuestionRouter(this.ollamaService.chat);
    this.answerGrader = new AnswerGrader(this.ollamaService.chat);
  }

  async run(question: string) {
    const app = this.graph.compile({
      checkpointer: MemorySaver,
    });
    app.invoke(question);
  }

  async setupGraph(_graphState: typeof graphState) {
    this.graph = new StateGraph({
      channels: _graphState,
    })
      .addNode('retrieve', this.retrieve)
      .addNode('grade_documents', this.gradeDocuments)
      .addNode('generate', this.generate)
      .addNode('transform_query', this.transformQuery)
      .addConditionalEdges(START, this.routeQuestion)
      .addEdge('retrieve', 'grade_documents')
      .addConditionalEdges('grade_documents', this.decideToGenerate)
      .addEdge('transform_query', 'retrieve')
      .addConditionalEdges(
        'generate',
        this.gradeGenerationDocumentsAndQuestion,
        {
          not_supported: 'generate',
          useful: END,
          not_useful: 'transform_query',
        },
      );
    // nodes
  }
  async retrieve(state: RAGState) {
    const documents = await this.retrieverService
      .getRetriever()
      .invoke(state.question);
    return { documents };
  }

  async generate(state: RAGState) {
    const generation = await this.ragChain.invoke({
      context: Utils.formatDocs(state.documents),
      question: state.question,
    });

    return { generation };
  }

  // Determines whether the retrieved documents are relevant to the question.
  async gradeDocuments(state: RAGState) {
    console.log('---CHECK DOCUMENT RELEVANCE TO QUESTION---');
    // Score each doc
    const relevantDocs: Document[] = [];
    for (const doc of state.documents) {
      const grade: { score: string } = await this.retrievalGrader.run({
        question: state.question,
        content: doc.pageContent,
      });
      if (grade.score === 'yes') {
        console.log('---GRADE: DOCUMENT RELEVANT---');
        relevantDocs.push(doc);
      } else {
        console.log('---GRADE: DOCUMENT NOT RELEVANT---');
      }
    }
    return { documents: relevantDocs };
  }

  // Re-write question
  async transformQuery(state: RAGState) {
    console.log('---TRANSFORM QUERY---');
    const betterQuestion = await this.answerReWriter.run({
      question: state.question,
    });
    return { question: betterQuestion };
  }

  // Decide on the datasource to route the initial question to.
  async routeQuestion(state: RAGState) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const source: { datasource: string } = await this.questionRouter.run({
      question: state.question,
    });
    /*if (source.datasource === 'web_search') {
      console.log(`---ROUTING QUESTION "${state.question} TO WEB SEARCH---`);
      return 'web_search';
    } else {*/
    console.log(`---ROUTING QUESTION "${state.question} TO RAG---`);
    return 'retrieve';
    //}
  }
  // Decide whether the current documents are sufficiently relevant
  // to come up with a good answer.
  async decideToGenerate(state: RAGState) {
    const filteredDocuments = state.documents;
    // All documents have been filtered as irrelevant
    // Regenerate a new query and try again
    if (filteredDocuments.length === 0) {
      console.log(
        '---DECISION: ALL DOCUMENTS ARE NOT RELEVANT TO QUESTION, TRANSFORM QUERY---',
      );
      return 'transform_query';
    } else {
      // We have relevant documents, so generate answer.
      console.log('---DECISION: GENERATE---');
      return 'generate';
    }
  }
  async gradeGenerationDocumentsAndQuestion(state: RAGState) {
    // TODO: Check for hallucination

    // Check question answering
    console.log('---GRADING GENERATION vs. QUESTION---');
    const onTopicGrade: { score: string } = await this.answerGrader.run({
      question: state.question,
      generation: state.generation,
    });
    if (onTopicGrade.score === 'yes') {
      console.log('---DECISION: GENERATION ADDRESSES QUESTION---');
      return 'useful';
    } else {
      console.log('---DECISION: GENERATION DOES NOT ADDRESS QUESTION---');
      return 'not_useful';
    }
  }
}
