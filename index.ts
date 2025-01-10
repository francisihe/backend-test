import express from 'express';
import sequelize from './config/db';
import cookieParser from 'cookie-parser';
import { NODE_ENV, PORT } from './config/constants';

import { runMigrations } from './config/runMigrations';

import userRouter from './routes/userRouter';
import postRouter from './routes/postRouter';
import commentRouter from './routes/commentRouter';
import healthRouter from './routes/healthRouter';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json('Rise API is running...');
});
app.get('/health', healthRouter);

// Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/comments', commentRouter);

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