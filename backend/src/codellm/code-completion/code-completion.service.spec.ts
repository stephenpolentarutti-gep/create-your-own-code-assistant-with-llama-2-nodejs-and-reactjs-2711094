import { Test, TestingModule } from '@nestjs/testing';
import { CodeCompletionService } from './code-completion.service';

describe('CodeCompletionService', () => {
  let service: CodeCompletionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodeCompletionService],
    }).compile();

    service = module.get<CodeCompletionService>(CodeCompletionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
