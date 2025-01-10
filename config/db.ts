import { Sequelize } from 'sequelize';
import { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DATABASE_URL } from './constants';

let sequelize: Sequelize;

if (DATABASE_URL) {
    // Use connection URL if available
    sequelize = new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
} else {
    // Use credentials in constants.ts if connection URL is not available
    sequelize = new Sequelize(DB_NAME as string, DB_USER as string, DB_PASSWORD as string, {
        host: DB_HOST as string,
        port: DB_PORT as number,
        dialect: 'postgres',
        logging: false,
    });
}

export default sequelize;

// import { Sequelize } from 'sequelize';
// import { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD } from './constants';

// const sequelize = new Sequelize(DB_NAME as string, DB_USER as string, DB_PASSWORD as string, {
//     host: DB_HOST as string,
//     dialect: 'postgres',
//     logging: false,
//     // logging: true,
// });

// export default sequelize;