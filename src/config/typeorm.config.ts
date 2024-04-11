import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'u179156391_transhrms',
  password: 'Tgpl@2024',
  database: 'u179156391_hrms',
  entities: [
    __dirname + '/../**/*.entity{.ts,.js}',
  ],
  synchronize: true,
  logging: true
};
