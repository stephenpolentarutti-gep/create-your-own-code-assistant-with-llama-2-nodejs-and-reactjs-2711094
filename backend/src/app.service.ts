import { Injectable } from '@nestjs/common';
import { DataProcessingService } from './data-processing/data-processing.service';
import { RagService } from './rag/rag/rag.service';
import { RefactorService } from './codellm/refactor/refactor.service';

@Injectable()
export class AppService {
  constructor(
    private dataProcessingService: DataProcessingService,
    private ragService: RagService,
    private refactorService: RefactorService,
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
}
