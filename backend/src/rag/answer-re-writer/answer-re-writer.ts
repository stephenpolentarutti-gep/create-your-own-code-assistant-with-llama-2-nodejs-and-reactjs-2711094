import { BaseGrader } from '../base-grader/base-grader';

export class AnswerReWriter extends BaseGrader {
  constructor(chat: any) {
    super(chat, 'sde/rewriter-prompt');
  }
}
