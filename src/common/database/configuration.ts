import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// const databaseConf: TypeOrmModuleOptions = {
//   type: 'mariadb',
//   host: process.env.DATABASE_HOST,
//   port: parseInt(process.env.DATABASE_PORT),
//   username: process.env.USERNAME,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
//   logging: process.env.LOGGING === 'true',
//   entities: [process.env.ENTITIES],
//   synchronize: process.env.SYNCHRONIZE === 'true',
// };

const databaseConf: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'ghdcoalss33',
  database: 'live-pulse',
  logging: true,
  entities: ['./dist/**/**/*.entity{.ts,.js}'],
  synchronize: true,
};

export default databaseConf;
