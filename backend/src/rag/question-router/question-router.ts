import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { BaseGrader } from '../base-grader/base-grader';

export class QuestionRouter extends BaseGrader {
  constructor(chat: ChatOllama) {
    super(chat, 'sde/RouterPrompt');
  }
}
