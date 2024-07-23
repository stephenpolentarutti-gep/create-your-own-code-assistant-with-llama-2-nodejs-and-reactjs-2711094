import { Injectable } from '@nestjs/common';
import {PrismaVectorStore} from '@langchain/community/vectorstores/prisma';
import { ConfigService } from '@nestjs/config';
import { OllamaService } from 'src/ollama/ollama.service';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService {
  private vectorStore;
  private readonly prisma = new PrismaClient();
  constructor(private configService: ConfigService, private ollamaService: OllamaService) {}

  getVectorStore() {
    this.vectorStore;
  }
  async GenerateEmbeddings(texts): Promise<void> {
    this.vectorStore = await PrismaVectorStore.fromDocuments(texts,
      this.ollamaService.getEmbeddings(),
      {
        db: this.prisma,
        prisma: Prisma,
        tableName: this.configService.get<string>('database.tableName', 'documents'),
        vectorColumnName: this.configService.get<string>('databse.columnName', 'match_documents'),
        columns: {
          id: PrismaVectorStore.IdColumn,
          content: PrismaVectorStore.ContentColumn
        }
      }
    );
  }
}
