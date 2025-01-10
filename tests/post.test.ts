import request from 'supertest';
import app from '../index';
import sequelize from '../config/db';

// beforeAll(async () => {
//     try {
//         await sequelize.sync({ force: true });
//     } catch (error) {
//         console.error('Database sync error:', error);
//     }
// });

// afterAll(async () => {
//     await sequelize.close();
// });

describe('Post Creation Without Auth', () => {
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

describe('Post Creation With Auth, CRUD operations', () => {
    let cookie: string;

    beforeEach(async () => {
        // Clear database before each test
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
    });

    it('should create post with auth', async () => {
        const response = await request(app)
            .post('/api/v1/posts')
            .set('Cookie', [cookie])
            .send({
                title: 'Test Post 1',
                content: 'This is a test post content'
            });

        expect(response.status).toBe(201);
        expect(response.body.status).toBe(true);
        expect(response.body.data).toHaveProperty('id');
    });

    it('should get posts', async () => {
        const response = await request(app)
            .get('/api/v1/posts')
            .set('Cookie', [cookie]);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.data).toBeInstanceOf(Array);
    });

    it('should get user posts', async () => {
        const response = await request(app)
            .get('/api/v1/posts')
            .set('Cookie', [cookie]);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.data).toBeInstanceOf(Array);
    });

});

describe('Post CRUD operations with postId', () => {
    let cookie: string;
    let postId1: number;
    let postId2: number;

    beforeEach(async () => {
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

        // Create two posts
        const testPost1 = await request(app)
            .post('/api/v1/posts')
            .set('Cookie', [cookie])
            .send({ title: 'Test Post 1', content: 'This is a test post content for post 2' });

        postId1 = testPost1.body.data.id;

        const testPost2 = await request(app)
            .post('/api/v1/posts')
            .set('Cookie', [cookie])
            .send({ title: 'Test Post 2', content: 'This is a test post content for post 2' });

        postId2 = testPost2.body.data.id;
    });

    it('should get post by id', async () => {
        const response = await request(app)
            .get(`/api/v1/posts/${postId1}`)
            .set('Cookie', [cookie]);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.body.data).toHaveProperty('id');
    });

    it('should update post', async () => {
        const response = await request(app)
            .patch(`/api/v1/posts/${postId1}`)
            .set('Cookie', [cookie])
            .send({ title: 'Updated title', content: 'Updated content' });

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
    });

it('should not update post without auth', async () => {
    const response = await request(app)
        .put(`/api/v1/posts/${postId1}`)
        .send({ title: 'Updated title', content: 'Updated content' });

    expect(response.status).toBe(401);
});

    it('should delete post 2', async () => {
        const response = await request(app)
            .delete(`/api/v1/posts/${postId2}`)
            .set('Cookie', [cookie]);

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
    });

    it('should not delete post without auth', async () => {
        const response = await request(app)
            .delete(`/api/v1/posts/${postId1}`);

        expect(response.status).toBe(401);
    });
});


describe('Post - check valid parameters', () => {
    let cookie: string;

    beforeEach(async () => {
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
    });

    it('should not update post with invalid id', async () => {
        const response = await request(app)
            .patch(`/api/v1/posts/invalidId`)
            .set('Cookie', [cookie])
            .send({ title: 'Updated title', content: 'Updated content' });

        expect(response.status).toBe(400);
    });

    it('should not get post with invalid id', async () => {
        const response = await request(app)
            .get(`/api/v1/posts/invalidId`)
            .set('Cookie', [cookie]);

        expect(response.status).toBe(400);
    });

    it('should not delete post with invalid id', async () => {
        const response = await request(app)
            .delete(`/api/v1/posts/invalidId`)
            .set('Cookie', [cookie]);

        expect(response.status).toBe(400);
    });

    it('should not get post that does not exist', async () => {
        const response = await request(app)
            .get(`/api/v1/posts/99999`)
            .set('Cookie', [cookie]);

        expect(response.status).toBe(404);
    });

    it('should not update post that does not exist', async () => {
        const response = await request(app)
            .put(`/api/v1/posts/99999`)
            .set('Cookie', [cookie])
            .send({ title: 'Updated title', content: 'Updated content' });

        expect(response.status).toBe(404);
    });

    it('should not delete post that does not exist', async () => {
        const response = await request(app)
            .delete(`/api/v1/posts/99999`)
            .set('Cookie', [cookie]);

        expect(response.status).toBe(404);
    });

});