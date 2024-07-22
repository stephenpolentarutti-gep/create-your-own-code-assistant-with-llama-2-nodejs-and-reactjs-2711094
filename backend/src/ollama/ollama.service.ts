import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OllamaEmbeddings } from '@langchain/community/embeddings/ollama';
import { ChatOllama } from '@langchain/community/chat_models/ollama';

@Injectable()
export class OllamaService {
  embeddings: OllamaEmbeddings;
  chat: ChatOllama;

  constructor(private configService: ConfigService) {
    this.embeddings = new OllamaEmbeddings({
      model: this.configService.get<string>('model', 'llama2'),
      baseUrl: this.configService.get<string>('baseUrl'),
      requestOptions: this.configService.get<Record<string,string>>('requestOptions')
    });
    this.chat = new ChatOllama({
      model: this.configService.get<string>('model', 'llama2'),
      baseUrl: this.configService.get<string>('baseUrl'),
      format: this.configService.get<string>('format', 'json'),
      temperature: this.configService.get<number>('chatTemperature', 0.5),
      topP: this.configService.get<number>('chatTopP', 1),
      topK: this.configService.get<number>('chatTopK', 40)
    });
  }

  getEmbeddings(): OllamaEmbeddings {
    return this.embeddings;
  }
  getChat(): ChatOllama {
    return this.chat;
  }
}
