import { Test, TestingModule } from '@nestjs/testing';
import { RecipeMetadataService } from './recipe-metadata.service';

describe('RecipeMetadataService', () => {
  let service: RecipeMetadataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RecipeMetadataService],
    }).compile();

    service = module.get<RecipeMetadataService>(RecipeMetadataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
