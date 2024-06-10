import { TypeOrmModuleOptions } from "@nestjs/typeorm";




 //Production DB


// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: '154.41.233.52',
//   port: 3306,
//   username: 'u179156391_transhrms',
//   password: 'Tgpl@2023',
//   database: 'u179156391_hrms',
//   entities: [ __dirname + '/../**/*.entity{.ts,.js}',],
//   synchronize: false,
//   logging: true
// };



// Local DB
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'Chitradeep@12345',
  database: 'hrms4',
  entities: [
    __dirname + '/../**/*.entity{.ts,.js}',
  ],
  synchronize: false,
  logging: true
};