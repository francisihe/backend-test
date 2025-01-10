import { Umzug, SequelizeStorage } from 'umzug';
import sequelize from "./db";

const umzug = new Umzug({
    migrations: {
        glob: 'migrations/*.js', //path to migration files
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
    logger: console,
});

export const runMigrations = async () => {
    try {
        await umzug.up(); // Run all pending migrations
        console.log('Migrations have been applied successfully.');
    } catch (error) {
        console.error('Error running migrations:', error);
        throw error;
    }
};