import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as helmet from 'helmet';
require('dotenv').config();

const port = process.env.PORT || 3000;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.use(helmet());
	app.enableCors();
	await app.listen(port, () => {
		Logger.log(`Server running on http://localhost:${port}`);
	});
}
bootstrap();
