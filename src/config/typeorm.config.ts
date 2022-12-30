import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import databaseConfig from './database-config';

export const typeOrmConfig: TypeOrmModuleOptions = databaseConfig;

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return databaseConfig;
  },
};



















// import { ConfigModule, ConfigService } from "@nestjs/config";
// import {  TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";

// export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
//   useFactory: async (): Promise<TypeOrmModuleOptions> => {
//     return {
//       type: 'mysql',
//       host: process.env.TYPEORM_HOST,
//       port: parseInt(process.env.TYPEORM_PORT),
//       username: process.env.TYPEORM_USERNAME,
//       password: process.env.TYPEORM_PASSWORD,
//       database: process.env.TYPEORM_DATABASE,
//       entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//       cli: {
//         migrationDir: __dirname + '/../migrations',
//       },
//       extra: {
//         charset: 'utf8mb4_unicode_ci',
//       },

//       synchronize: false,
//       logging: true,
//     }
//   }
// };

// export const TypeOrmConfig: TypeOrmModuleOptions  = {
//   type: 'mysql',
//   host: process.env.TYPEORM_HOST,
//   port: parseInt(process.env.TYPEORM_PORT),
//   username: process.env.TYPEORM_USERNAME,
//   password: process.env.TYPEORM_PASSWORD,
//   database: process.env.TYPEORM_DATABASE,
//   entities: [__dirname + '/ ../**/*.entity{.ts,.js}'],
//   cli: {
//     migrationDir: __dirname + '/../migrations',
//   },
//   extra: {
//     charset: 'utf8mb4_unicode_ci',
//   },

//   synchronize: true,
//   logging: true,
// }


// export default class TypeOrmConfig {
//   static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
//     return {
//       type: "mysql",
//       host: configService.get(process.env.TYPEORM_HOST),
//       port: configService.get(process.env.TYPEORM_PORT),
//       username: configService.get(process.env.TYPEORM_USERNAME),
//       password: configService.get(process.env.TYPEORM_PASSWORD),
//       database: configService.get(process.env.TYPEORM_DATABASE),
//       entities: [__dirname + '/ ../**/*.entity{.ts,.js}'],
//       synchronize: true,
//       logging: true,
      
//       // migrations: commonConf.MIGRATIONS,
//       // migrationsRun: commonConf.MIGRATIONS_RUN,
//     }
//   }
// };

// export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
//   imports: [ConfigModule],
//   useFactory: async (
//     configService: ConfigService,
//    ): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
//    inject: [ConfigService]
// };
  
