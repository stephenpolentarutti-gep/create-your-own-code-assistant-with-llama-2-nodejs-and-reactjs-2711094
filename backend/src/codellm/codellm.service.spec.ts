import { Test, TestingModule } from '@nestjs/testing';
import { CodellmService } from './codellm.service';

describe('CodellmService', () => {
  let service: CodellmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CodellmService],
    }).compile();

    service = module.get<CodellmService>(CodellmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
