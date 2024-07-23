import { Module } from '@nestjs/common';
import { IngestCommand } from './ingest.command';
import { DataProcessingService } from 'src/data-processing/data-processing.service';

@Module({
  imports: [],
  providers: [IngestCommand, DataProcessingService],
  exports: [IngestCommand]
})
export class CliModule {}
