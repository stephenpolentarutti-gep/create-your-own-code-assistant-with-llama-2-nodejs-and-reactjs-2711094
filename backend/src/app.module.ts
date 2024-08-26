import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CodellmService } from './codellm/codellm.service';
import { OllamaService } from './ollama/ollama.service';
import CustomConfigService from './custom-config/custom-config.service';
import { ConfigModule } from '@nestjs/config';
import { DataProcessingService } from './data-processing/data-processing.service';
import { DatabaseService } from './database/database.service';
import { CliModule } from './cli/cli.module';
import { RagModule } from './rag/rag.module';
import { CodellmModule } from './codellm/codellm.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // @ts-expect-error Nest will solve for us
      load: [CustomConfigService]
    }),
    CliModule,
    RagModule,
    CodellmModule
  ],
  controllers: [AppController],
  providers: [AppService, CodellmService, OllamaService, DataProcessingService, DatabaseService],
})
export class AppModule {}
