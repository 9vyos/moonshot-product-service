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
import { getConfig, getDataSourceConfig } from './common/database/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      ignoreEnvFile: false,
    }),
    TypeOrmModule.forRootAsync(
      {
        useFactory: () => getConfig(),
        dataSourceFactory: async function () {
          return addTransactionalDataSource(new DataSource(getDataSourceConfig()));
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
