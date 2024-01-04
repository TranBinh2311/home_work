import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SeederService } from './common/seeder/seeder.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {},
    }),
  );

  app.enableCors({
    origin: '*', // Specify the allowed origin or a list of origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    allowedHeaders: 'Content-Type, Accept', // Allowed HTTP headers
    credentials: true, // Allow sending cookie credentials with requests
  });
  // Set up swagger
  const config = new DocumentBuilder()
    .setTitle('Fixtures API')
    .setDescription('The fixtures API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Seeder Service
  const seeder = app.get(SeederService);
  await seeder.seed();

  await app.listen(5000);
}
bootstrap();
