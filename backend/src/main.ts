import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable Cross-Origin Resource Sharing
  app.enableCors();

  // Configure Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('DapoerDjawa API')
    .setDescription('DapoerDjawa Backend API Documentation with NestJS and Prisma v7')
    .setVersion('1.0')
    .addTag('DapoerDjawa API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`🚀 Backend running on: http://localhost:${port}`);
  console.log(`📚 Swagger docs available at: http://localhost:${port}/api`);
}

await bootstrap();
