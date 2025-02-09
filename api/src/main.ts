import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { GlobalPipesConfig } from './common/pipes/global.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

dotenv.config();
async function start() {
	const PORT = Number(process.env.PORT) || 5000;
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

	const config = new DocumentBuilder()
		.setTitle('Ticket Management System - REST API')
		.setDescription('REST API documentation')
		.setVersion('1.0.0')
		.build();
	const document = SwaggerModule.createDocument(app, config, {
		ignoreGlobalPrefix: false,
	});
	SwaggerModule.setup('/api/docs', app, document);

	await app.listen(PORT, '0.0.0.0');
	console.info('\x1b[34m%s\x1b[0m', `Server started on port = ${PORT}`);
}
void start();
