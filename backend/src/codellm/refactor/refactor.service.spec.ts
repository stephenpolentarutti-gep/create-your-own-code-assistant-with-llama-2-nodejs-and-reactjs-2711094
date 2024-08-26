import { Test, TestingModule } from '@nestjs/testing';
import { RefactorService } from './refactor.service';

describe('RefactorService', () => {
  let service: RefactorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefactorService],
    }).compile();

    service = module.get<RefactorService>(RefactorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
