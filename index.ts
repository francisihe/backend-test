import express from 'express';
import sequelize from './config/db';
import { NODE_ENV, PORT } from './config/constants';

import { runMigrations } from './config/runMigrations';

import userRouter from './routes/userRouter';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json('Rise API is running...');
});

// Routes
app.use('/api/v1/users', userRouter);

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully...');

        // Run migrations
        await runMigrations();
        
        app.listen(PORT, () => {
            console.log(`Server environment is ${NODE_ENV}`);
            console.log(`Server is running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Unable to connect to the database, exiting server:', error);
    }
}

startServer();