import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as morgan from 'morgan';
import * as cookieParser from 'cookie-parser';

import { applicationConfig } from 'config';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log('DB HOST: ', applicationConfig.db.host);
  console.log('DB USER: ', applicationConfig.db.user);
  console.log('DB PASSWORD: ', applicationConfig.db.password);
  console.log('DB NAME: ', applicationConfig.db.name);
  console.log('DB PORT: ', applicationConfig.db.port);
  console.log('PORT: ', applicationConfig.app.port);
  console.log('JWT SECRET: ', applicationConfig.jwt.secret);
  console.log('JWT COOKIE KEY: ', applicationConfig.jwt.cookieKey);
  console.log('JWT EXPIRES IN: ', applicationConfig.jwt.expiresIn);
  console.log('JWT ISSUER: ', applicationConfig.jwt.issuer);
  console.log('SENDER EMAIL: ', applicationConfig.email.senderEmail);
  console.log('SENDER PASSWORD: ', applicationConfig.email.senderPassword);

  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: true,
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
  });

  app.useGlobalPipes(new ValidationPipe());

  app.use(morgan('combined'));
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`, 'unpkg.com'],
          styleSrc: [
            `'self'`,
            `'unsafe-inline'`,
            'cdn.jsdelivr.net',
            'fonts.googleapis.com',
            'unpkg.com',
          ],
          fontSrc: [`'self'`, 'fonts.gstatic.com', 'data:'],
          imgSrc: [`'self'`, 'data:', 'cdn.jsdelivr.net'],
          scriptSrc: [
            `'self'`,
            `https: 'unsafe-inline'`,
            `cdn.jsdelivr.net`,
            `'unsafe-eval'`,
          ],
        },
      },
    }),
  );

  await app.listen(applicationConfig.app.port, '0.0.0.0');

  console.log(`Application is running on: ${applicationConfig.app.port}`);
}
bootstrap();
