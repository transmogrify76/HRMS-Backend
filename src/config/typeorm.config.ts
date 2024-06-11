import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Image } from "src/modules/upload-pic/image.entity";



 //Production DB


export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '154.41.233.52',
  port: 3306,
  entities: [ __dirname + '/../**/*.entity{.ts,.js}',],
  username: 'u179156391_transhrms',
  password: 'Tgpl@2023',
  database: 'u179156391_hrms',
  synchronize: false,
  logging: true
};



// Local DB
// export const typeOrmConfig: TypeOrmModuleOptions = {
//   type: 'mysql',
//   host: '127.0.0.1',
//   port: 3306,
//   username: 'root',
//   password: 'admin',
//   database: 'hrms',
//   entities: [
//     Image,
//     __dirname + '/../**/*.entity{.ts,.js}' ,
//   ],
//   synchronize: false,
//   logging: true
// };