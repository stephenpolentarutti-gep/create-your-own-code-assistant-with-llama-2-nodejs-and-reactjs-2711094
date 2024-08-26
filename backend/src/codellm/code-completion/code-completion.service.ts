import { Injectable } from '@nestjs/common';

import { RagService } from '../../rag/rag/rag.service';

@Injectable()
export class CodeCompletionService {
  constructor(private ragService: RagService) {}

  async getCompletion(context: string): Promise<string> {
    const question = `Provide code completion for the following context: ${context}`;
    const response = await this.ragService.run(question);
    return response;
  }
}
