import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppConfigType } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  /**
   * global pipes
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  /**
   * swagger configuration
   */
  const config = new DocumentBuilder()
    .setTitle('My NestJS API - Learning')
    .setDescription(
      'The NestJS API Learning Decscription - Base URL: http://localhost:3000/api',
    )
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .setLicense(
      'MIT License',
      'https://github.com/nestjs/nest/blob/master/LICENSE',
    )
    /**
     * Optional License
     */
    // .setLicense('MIT License', 'https://opensource.org/licenses/MIT')
    /**
     * Server Configuration to base URL
     */
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .addTag('NestJS-learning')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  /**
   * server start
   */

  const configService = app.get(ConfigService);
  const appConf = configService.getOrThrow<AppConfigType>('app');
  const port = appConf.port;
  await app.listen(port);
}
void bootstrap();
