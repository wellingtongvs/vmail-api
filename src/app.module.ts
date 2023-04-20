import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { graphQLConfig } from './config/graphql';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { EmailsModule } from './emails/emails.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'mongodb',
          host: process.env.DB_HOST,
          database: process.env.DB_NAME,
          synchronize: true,
          autoLoadEntities: true,
          useUnifiedTopology: true,
        };
      },
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>(graphQLConfig),
    UsersModule,
    EmailsModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
