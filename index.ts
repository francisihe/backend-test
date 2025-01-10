import express from 'express';
import sequelize from './config/db';
import cookieParser from 'cookie-parser';
import { NODE_ENV, PORT } from './config/constants';

// import { runMigrations } from './config/runMigrations';

import userRouter from './routes/userRouter';
import postRouter from './routes/postRouter';
import commentRouter from './routes/commentRouter';
import healthRouter from './routes/healthRouter';
import customRouter from './routes/customRouter';
import { verifyUser } from './middleware/authentication/verifyUser';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.json('Rise API is running...');
});

// Routes
app.use('/health', healthRouter);
app.use('/api/v1/users', userRouter);
app.use('/custom-query', customRouter);

app.use('/api/v1/*', verifyUser);
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/comments', commentRouter);

async function startServer() {
    try {
        await sequelize.authenticate();
        console.info('Database connection has been established successfully...');

        // Run migrations -- Moved migrations to run during build in prod, and in scripts/runMigration.ts in dev to avoid running migrations on every server start
        // await runMigrations();

        if (NODE_ENV !== 'test') {
            app.listen(PORT, () => {
                console.info(`Server environment is ${NODE_ENV}`);
                console.info(`Server is running on http://localhost:${PORT}`);
            });
        }

    } catch (error) {
        console.error('Unable to connect to the database, exiting server:', error);
    }
}

export default app;
startServer();

