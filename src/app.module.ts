import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { ProductImageModule } from './product-image/product-image.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloFederationDriver } from '@nestjs/apollo';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      ignoreEnvFile: false,
    }),
    TypeOrmModule.forRootAsync(
      {
        useFactory: () => ({
          type: 'mariadb',
          host: process.env.DATABASE_HOST,
          port: parseInt(process.env.DATABASE_PORT),
          username: process.env.USERNAME,
          password: process.env.PASSWORD,
          database: process.env.DATABASE,
          logging: process.env.LOGGING === 'true',
          entities: [process.env.ENTITIES],
          synchronize: process.env.SYNCHRONIZE === 'true',
        }),
        async dataSourceFactory() {
          return addTransactionalDataSource(new DataSource({
            type: 'mariadb',
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT),
            username: process.env.USERNAME,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            logging: process.env.LOGGING === 'true',
            entities: [process.env.ENTITIES],
            synchronize: process.env.SYNCHRONIZE === 'true',
          }));
        },
      }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
      },
    }),
    ProductModule,
    CategoryModule,
    ProductImageModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
