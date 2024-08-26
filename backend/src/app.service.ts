import { Injectable } from '@nestjs/common';
import { DataProcessingService } from './data-processing/data-processing.service';
import { RagService } from './rag/rag/rag.service';
import { RefactorService } from './codellm/refactor/refactor.service';
import { CodeCompletionService } from './codellm/code-completion/code-completion.service';

@Injectable()
export class AppService {
  constructor(
    private dataProcessingService: DataProcessingService,
    private ragService: RagService,
    private refactorService: RefactorService,
    private completionService: CodeCompletionService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async ingest(): Promise<any> {
    console.log('Ingesting data');
    await this.dataProcessingService.extractAndStoreData(process.cwd());
    return { message: 'Ingested data' };
  }
  async chat(prompt): Promise<string> {
    await this.ragService.run(prompt);
  }
  async rename(oldName: string, newName: string): Promise<string> {
    return await this.refactorService.renameVariable(oldName, newName);
  }
  async completion(context: string): Promise<string> {
    return await this.completionService.getCompletion(context);
  }
}
