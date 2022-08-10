import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import '@/decorate-basic-classes';

async function bootstrap() {
	const app = await NestFactory.createMicroservice<MicroserviceOptions>(
		AppModule,
		{
			transport: Transport.TCP,
		},
	);
	await app.listen();
}

bootstrap();
