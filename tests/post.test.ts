import request from 'supertest';
import app from '../index';
import sequelize from '../config/db';

describe('Post Creation Without Auth', () => {
    beforeAll(async () => {
        try {
            await sequelize.sync({ force: true });
        } catch (error) {
            console.error('Database sync error:', error);
        }
    });

    afterAll(async () => {
        await sequelize.close();
    });
        
    it('should not create post without auth', async () => {
        const response = await request(app)
            .post('/api/v1/posts')
            .send({
                title: 'Test Post',
                content: 'This is a test post content'
            });

        expect(response.status).toBe(401);
    });
});

