import { Module } from '@nestjs/common';
import { IngestCommand } from './ingest.command';
import { DataProcessingService } from 'src/data-processing/data-processing.service';
import { OllamaService } from 'src/ollama/ollama.service';
import { DatabaseService } from 'src/database/database.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [],
  providers: [
    IngestCommand,
    OllamaService,
    DatabaseService,
    ConfigService,
    DataProcessingService,
  ],
  exports: [IngestCommand],
})
export class CliModule {}
