import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { applicationConfig } from 'config';
import { Dialect } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { JwtService } from '@nestjs/jwt';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_DIALECT: Joi.string(),
        DB_HOST: Joi.string(),
        DB_PORT: Joi.number().default(5432),
        DB_USER: Joi.string(),
        DB_PASSWORD: Joi.string().allow(''),
        DB_NAME: Joi.string(),
        PORT: Joi.number().default(8080),
        ENV: Joi.string()
          .valid('development', 'base', 'beta', 'qa', 'qa2')
          .default('development'),
      }),
    }),
    SequelizeModule.forRoot({
      dialect: applicationConfig.db.dbDialect as Dialect,
      host: applicationConfig.db.host,
      username: applicationConfig.db.user,
      password: applicationConfig.db.password,
      port: parseInt(applicationConfig.db.port, 10),
      database: applicationConfig.db.name,
      logging: false,
      autoLoadModels: true,
      synchronize: false,
    }),
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      debug: false,
      playground: applicationConfig.app.env !== 'base',
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      synchronize: true,
      fieldResolverEnhancers: ['guards'],
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
