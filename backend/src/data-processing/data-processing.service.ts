import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DirectoryLoader,
  UnknownHandling,
} from 'langchain/document_loaders/fs/directory';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class DataProcessingService {
  constructor(
    private configService: ConfigService,
    private databaseService: DatabaseService,
  ) {}

  async extractAndStoreData(directory: string): Promise<void> {
    const docs = await this.loadWorkspace(directory);
    const texts = await this.extract(docs);
    await this.storeEmbeddings(texts);
  }

  async loadWorkspace(directory: string): Promise<unknown[]> {
    const REPO_PATH = directory || this.configService.get<string>('workspace');
    const loaders = this.configService.get<string[]>('loaders');
    const exclude_globs = this.configService.get<string[]>('exclude');

    const textLoaders = loaders.reduce((acc, cur) => {
      acc[cur] = (path) => new TextLoader(path);
      return acc;
    }, {});

    const loader = new DirectoryLoader(
      REPO_PATH,
      textLoaders,
      true,
      UnknownHandling.Ignore
    );
    const documents = await loader.load();
    return documents;
  }

  async extract(documents) {
    const splitter = RecursiveCharacterTextSplitter.fromLanguage('js', {
      chunkSize: 2000,
      chunkOverlap: 200,
    });
    const texts = await splitter.splitDocuments(documents);

    return texts;
  }

  async storeEmbeddings(texts) {
    await this.databaseService.GenerateEmbeddings(texts);
  }
}
