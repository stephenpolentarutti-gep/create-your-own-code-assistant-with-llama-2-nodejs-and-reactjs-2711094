import { Module } from '@nestjs/common';
import { RefactorService } from './refactor/refactor.service';
import { RagService } from 'src/rag/rag/rag.service';

@Module({
  providers: [RefactorService],
  exports: [RefactorService],
  imports: [RagService],
})
export class CodellmModule {}
