import { JsonOutputParser } from '@langchain/core/output_parsers';
import { ChatOllama } from '@langchain/community/chat_models/ollama';
import type { Document } from '@langchain/core/documents';
import * as hub from 'langchain/hub';

export abstract class BaseGrader {
  grader: any;
  constructor(
    private readonly chat: ChatOllama,
    GRADER_TEMPLATE: string,
  ) {
    hub.pull(GRADER_TEMPLATE).then((module) => {
      this.grader = module.pipe(chat).pipe(new JsonOutputParser());
    });
  }

  run(docs: Document[], question: string): Promise<any> {
    return this.grader.invoke({
      question,
      content: docs,
    });
  }
}
