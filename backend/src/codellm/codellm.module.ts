import { Module } from '@nestjs/common';
import { RefactorService } from './refactor/refactor.service';
import { RagService } from 'src/rag/rag/rag.service';
import { CodellmService } from './codellm.service';
import { CodeCompletionService } from './code-completion/code-completion.service';

@Module({
  providers: [RefactorService, CodellmService, CodeCompletionService],
  exports: [RefactorService, CodeCompletionService],
  imports: [RagService],
})
export class CodellmModule {}
