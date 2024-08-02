import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { BaseGrader } from '../base-grader/base-grader';

export class AnswerGrader extends BaseGrader {
  constructor(chat: ChatOllama) {
    super(chat, 'sde/AnswerPrmpt');
  }
}
