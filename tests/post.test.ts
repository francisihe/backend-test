import request from 'supertest';
import app from '../index';
import sequelize from '../config/db';

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

        console.log(response.body);
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






//     it('should get posts', async () => {
//         const response = await request(app)
//             .get('/api/v1/posts');

//         expect(response.status).toBe(200);
//         expect(response.body.status).toBe(true);
//         expect(response.body.data).toBeInstanceOf(Array);
//     });

//     it('should get user posts', async () => {
//         const response = await request(app)
//             .get('/api/v1/posts')
//             .set('Cookie', [cookie]);

//         expect(response.status).toBe(200);
//         expect(response.body.status).toBe(true);
//         expect(response.body.data).toBeInstanceOf(Array);
//     });

//     it('should get post by id', async () => {
//         const response = await request(app)
//             .get(`/api/v1/posts/${postId}`);

//         expect(response.status).toBe(200);
//         expect(response.body.status).toBe(true);
//         expect(response.body.data).toHaveProperty('id');
//     });

//     it('should update post', async () => {
//         const response = await request(app)
//             .put(`/api/v1/posts/${postId}`)
//             .set('Cookie', [cookie])
//             .send({ title: 'Updated title', content: 'Updated content' });

//         expect(response.status).toBe(200);
//         expect(response.body.status).toBe(true);
//     });

//     it('should delete post', async () => {
//         const response = await request(app)
//             .delete(`/api/v1/posts/${postId}`)
//             .set('Cookie', [cookie]);

//         expect(response.status).toBe(200);
//         expect(response.body.status).toBe(true);
//     });

//     it('should not delete post without auth', async () => {
//         const response = await request(app)
//             .delete(`/api/v1/posts/${postId}`);

//         expect(response.status).toBe(401);
//     });

//     it('should not update post without auth', async () => {
//         const response = await request(app)
//             .put(`/api/v1/posts/${postId}`)
//             .send({ title: 'Updated title', content: 'Updated content' });

//         expect(response.status).toBe(401);
//     });

//     it('should not update post with invalid id', async () => {
//         const response = await request(app)
//             .put(`/api/v1/posts/invalidId`)
//             .set('Cookie', [cookie])
//             .send({ title: 'Updated title', content: 'Updated content' });

//         expect(response.status).toBe(400);
//     });

//     it('should not get post with invalid id', async () => {
//         const response = await request(app)
//             .get(`/api/v1/posts/invalidId`);

//         expect(response.status).toBe(400);
//     });

//     it('should not delete post with invalid id', async () => {
//         const response = await request(app)
//             .delete(`/api/v1/posts/invalidId`)
//             .set('Cookie', [cookie]);

//         expect(response.status).toBe(400);
//     });

//     it('should not get post that does not exist', async () => {
//         const response = await request(app)
//             .get(`/api/v1/posts/99999`);

//         expect(response.status).toBe(404);
//     });

//     it('should not update post that does not exist', async () => {
//         const response = await request(app)
//             .put(`/api/v1/posts/99999`)
//             .set('Cookie', [cookie])
//             .send({ title: 'Updated title', content: 'Updated content' });

//         expect(response.status).toBe(404);
//     });

//     it('should not delete post that does not exist', async () => {
//         const response = await request(app)
//             .delete(`/api/v1/posts/99999`)
//             .set('Cookie', [cookie]);

//         expect(response.status).toBe(404);
//     });

// });


