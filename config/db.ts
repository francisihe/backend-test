import { Sequelize } from 'sequelize';
import { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD } from './constants';

const sequelize = new Sequelize(DB_NAME as string, DB_USER as string, DB_PASSWORD as string, {
    host: DB_HOST as string,
    dialect: 'postgres',
    logging: false,
    // logging: true,
});

export default sequelize;