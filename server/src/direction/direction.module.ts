import { Module } from '@nestjs/common';
import { DirectionService } from './direction.service';
import { DirectionController } from './direction.controller';

@Module({
  providers: [DirectionService],
  controllers: [DirectionController]
})
export class DirectionModule {}
