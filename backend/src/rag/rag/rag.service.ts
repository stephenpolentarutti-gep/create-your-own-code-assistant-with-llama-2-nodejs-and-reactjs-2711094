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
  answerRewriter: typeof AnswerRewriter;
  constructor(
    private ollamaService: OllamaService,
    private retrieverService: RetrieverService,
  ) {
    hub.pull('sde/rag-prompt').then((module) => {
      this.ragChain = module
        .pipe(this.ollamaService.chat)
        .pipe(new StringOutputParser());
    });
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
      .addNode('transform_query', this.transformQuery);
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
}
