import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import databaseConf from "./common/database/configuration";
import { TypeOrmConfigService } from "./common/database/typeorm.config.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     console.log(configService.get('DATABASE_HOST'));
    //     return {
    //       type: 'mariadb',
    //       host: configService.get('DATABASE_HOST'),
    //       port: configService.get('DATABASE_PORT'),
    //       username: configService.get('USERNAME'),
    //       password: configService.get('PASSWORD'),
    //       database: configService.get('DATABASE'),
    //       logging: configService.get('LOGGING'),
    //       entities: [configService.get('ENTITIES')],
    //       synchronize: configService.get('SYNCHRONIZE'),
    //     };
    //   },
    // }),
    // TypeOrmModule.forRoot(databaseConf),
    TypeOrmModule.forRootAsync({ inject: [ConfigService], useClass: TypeOrmConfigService }),
    ProductModule,
    CategoryModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
