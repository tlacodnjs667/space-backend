import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '123123',
        database: 'space',
        // entities: [
        //     __dirname + '/../**/*.entity{.ts,.js}',
        // ],
        synchronize: true,
      });
      console.log('DataSource Initialized');

      return dataSource.initialize();
    },
  },
];
