import { Command, CommandRunner, Option } from "nest-commander";
import { DataProcessingService } from "src/data-processing/data-processing.service";

interface IngestCommandOptions {
  directory?: string;
}

@Command({
  name: 'ingest',
  description: 'Sets the source directory and parses code'
})
export class IngestCommand extends CommandRunner {
  constructor(
    private readonly dataProcessingService: DataProcessingService
  ) {
    super();
  }

  async run(passedParam: string[], options?: IngestCommandOptions): Promise<void> {
    if(!!options?.directory) {
      await this.dataProcessingService.extractAndStoreData(options.directory);
    } else {
      await this.dataProcessingService.extractAndStoreData(process.cwd());
    }
    console.log('Source directory set and code parsed successfully');
  }

  @Option({
    flags: '-d, --directory [string]',
    description: 'The directory to be treated as root of our codebase'
  })
  parseString(val: string): string {
    return val;
  }
}