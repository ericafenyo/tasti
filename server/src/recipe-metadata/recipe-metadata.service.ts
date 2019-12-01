import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeMetadata } from './recipe-metadata.entity';
import { RecipeMetadataDto } from './recipe-metadata.dto ';
import { Recipe } from '../recipe/recipe.entity';

@Injectable()
export class RecipeMetadataService {
  constructor(
    @InjectRepository(RecipeMetadata) private metadataRepository: Repository<RecipeMetadata>,
    @InjectRepository(Recipe) private recipeRepository: Repository<Recipe>,
  ) {}

  /**
   * Create and save a recipe metadata into the database.
   * @param id the recipe id
   * @param metaDataDto a {@link RecipeMetadataDto} object.
   */
  async create(id: string, metaDataDto: RecipeMetadataDto) {
    const recipe = await this.recipeRepository.findOne({ where: { id } });
    const metadata = this.metadataRepository.create({ ...metaDataDto, recipe });
    this.metadataRepository.save(metadata);
    return metadata;
  }
}
