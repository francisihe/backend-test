import request from 'supertest';
import app from '../index';
import sequelize from '../config/db';

describe('Comments', () => {
    let cookie: string;
    let postId: number;
    let userId: number;

    beforeAll(async () => {
        try {
            await sequelize.sync({ force: true });

            // Create user in the database
            await request(app)
                .post('/api/v1/users')
                .send({
                    username: 'existinguser',
                    name: 'Existing User',
                    email: 'existinguser@gmail.com',
                    password: 'password',
                });

            // Login the user created
            const response = await request(app)
                .post('/api/v1/users/login')
                .send({
                    email: 'existinguser@gmail.com',
                    password: 'password',
                });

            cookie = response.headers['set-cookie'];


            // Create post
            const postResponse = await request(app)
                .post('/api/v1/posts')
                .set('Cookie', [cookie])
                .send({
                    title: 'Test Post',
                    content: 'This is a test post content',
                });

            postId = postResponse.body.data.id;

        } catch (error) {
            console.error('Database sync error:', error);
        }
    });


    it('should create comment on post', async () => {
        const response = await request(app)
            .post(`/api/v1/posts/${postId}/comments`)
            .set('Cookie', [cookie])
            .send({ content: 'Test comment' });

        expect(response.status).toBe(201);
        expect(response.body.status).toBe(true);
    });

    it('should get post comments', async () => {
        const response = await request(app)
            .get(`/api/v1/posts/${postId}/comments`)
            .set('Cookie', [cookie]);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
    });

});