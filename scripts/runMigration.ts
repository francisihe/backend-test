import { runMigrations } from "../config/runMigrations";

const run = async () => {
    try {
        await runMigrations();
        console.log('Migrations completed successfully.');
    } catch (error) {
        console.error('Error running migrations:', error);
        process.exit(1);
    }
};

run();