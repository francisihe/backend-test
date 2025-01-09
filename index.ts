import express from 'express';
import sequelize from './config/db';
import { NODE_ENV, PORT } from './config/constants';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json('Rise API is running...');
});

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully...');
        
        app.listen(PORT, () => {
            console.log(`Server environment is ${NODE_ENV}`);
            console.log(`Server is running on http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Unable to connect to the database, exiting server:', error);
    }
}

startServer();