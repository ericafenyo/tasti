import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
require('dotenv').config();

const port = process.env.PORT || 2700;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Secure https requests
  app.use(helmet());
  app.enableCors();

  // Add an auto-validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      // Filter out required properties
      // whitelist: true,
      // forbidNonWhitelisted: true,
      transform: true
    })
  );

  await app.listen(port, () => {
    Logger.log(`Server running on http://localhost:${port}`);
  });
}
bootstrap();
