import { Test, TestingModule } from '@nestjs/testing';
import { RecipeMetadataController } from './recipe-metadata.controller';

describe('RecipeMetadata Controller', () => {
  let controller: RecipeMetadataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipeMetadataController],
    }).compile();

    controller = module.get<RecipeMetadataController>(RecipeMetadataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
