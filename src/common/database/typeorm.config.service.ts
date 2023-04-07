import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    private readonly configService: ConfigService
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mariadb',
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('USERNAME'),
      password: this.configService.get<string>('PASSWORD'),
      database: this.configService.get<string>('DATABASE'),
      logging: this.configService.get<boolean>('LOGGING'),
      entities: [this.configService.get<string>('ENTITIES')],
      synchronize: this.configService.get<boolean>('SYNCHRONIZE'),
    };
  }

}
