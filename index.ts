import express from 'express';
import sequelize from './config/db';
import cookieParser from 'cookie-parser';
import { NODE_ENV, PORT } from './config/constants';

import { runMigrations } from './config/runMigrations';

import userRouter from './routes/userRouter';
import postRouter from './routes/postRouter';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json('Rise API is running...');
});

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);

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