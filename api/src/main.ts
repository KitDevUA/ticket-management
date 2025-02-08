import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { GlobalPipesConfig } from './common/pipes/global.pipe';

dotenv.config();
async function start() {
	const PORT = Number(process.env.APP_PORT) || 5000;
	const app = await NestFactory.create(AppModule, {
		snapshot: true,
		rawBody: true,
	});

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true,
		}),
	);

	app.setGlobalPrefix('api');
	app.useGlobalFilters(new AllExceptionsFilter());
	app.useGlobalPipes(GlobalPipesConfig);

	app.enableCors({
		origin: true,
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
		allowedHeaders: 'Content-Type, Accept, Authorization, X-Requested-With',
		credentials: true,
	});

	await app.listen(PORT, () =>
		console.info('\x1b[34m%s\x1b[0m', `Server started on port = ${PORT}`),
	);
}
void start();
