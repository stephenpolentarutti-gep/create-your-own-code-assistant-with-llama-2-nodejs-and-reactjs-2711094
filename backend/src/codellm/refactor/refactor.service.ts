import { Injectable } from '@nestjs/common';
import { RagService } from '../../rag/rag/rag.service';

@Injectable()
export class RefactorService {
  constructor(private ragService: RagService) {}

  async renameVariable(oldName: string, newName: string): Promise<string> {
    const question = `Rename variable ${oldName} to ${newName} across all files.`;
    const response = await this.ragService.run(question);
    return response;
  }
}
