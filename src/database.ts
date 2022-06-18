import { DataSource } from "typeorm";
import { User } from './entities/User';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: '127.0.0.1',
    port: 5432,
    username: "postgres",
    password: "metabanana",
    database: "crudtypeorm",
    synchronize: true,
    // logging: true,
    entities: [User],
});