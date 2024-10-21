import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // evita campos extras en el Payload al crear
      //forbidNonWhitelisted: true,
      //disableErrorMessages: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Veraguas API')
    .setDescription('Documentación para la API de Hedy Backend')
    .setVersion('2.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('informacion', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
