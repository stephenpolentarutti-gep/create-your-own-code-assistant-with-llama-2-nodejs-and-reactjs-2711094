import { Module } from '@nestjs/common';
import { RagService } from './rag/rag.service';
import { RetrieverService } from './retriever/retriever.service';

@Module({
  providers: [RagService, RetrieverService]
})
export class RagModule {}
