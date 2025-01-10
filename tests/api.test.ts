import request from 'supertest';
import { Response } from 'express';
import app from '../index';
import sequelize from '../config/db';

let cookie;

// Helper function to extract cookie from response
const extractCookie = (response: request.Response): string => {
    const cookies = response.headers['set-cookie'];
    if (!cookies) return '';
    return cookies[0].split(';')[0];
};

describe('API Tests', () => {
    // Test data
    const testUser = {
        username: 'testuser',
        name: 'Test User',
        email: 'francisihe@gmail.com',
        password: 'password'
    };

    const testPost = {
        title: 'Test Post',
        content: 'This is a test post content'
    };

    let cookie: string;
    let userId: number;
    let postId: number;

    function sum(a: any, b: any) {
        return a + b;
      }

    describe('sum module', () => {
        test('adds 1 + 2 to equal 3', () => {
          expect(sum(1, 2)).toBe(3);
        });
      });

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

    // describe('User Authentication', () => {
    //     it('should register a new user', async () => {
    //         const response = await request(app)
    //             .post('/api/v1/users')
    //             .send(testUser);

    //         expect(response.status).toBe(201);
    //         expect(response.body.status).toBe(true);
    //         expect(response.body.data.user).toHaveProperty('id');

    //         userId = response.body.data.user.id;
    //     });

    //     it('should not register duplicate user', async () => {
    //         const response = await request(app)
    //             .post('/api/v1/users')
    //             .send(testUser);

    //         expect(response.status).toBe(400);
    //         expect(response.body.status).toBe(false);
    //     });

    //     it('should log in a user and set a cookie', async () => {
    //         const response = await request(app)
    //             .post('/api/v1/users/login')
    //             .send({
    //                 email: 'francisihe@gmail.com',
    //                 password: 'password',
    //             });
    //         expect(response.status).toBe(200);
    //         expect(response.body.status).toBe(true);
    //         expect(response.headers['set-cookie']).toBeDefined(); // Check if cookie is set
    
    //         // Extract the cookie from the response
    //         cookie = extractCookie(response); // Corrected from 'token' to 'cookie'
    //     });
    
    // });

    // describe('Posts', () => {
    //     it('should not create post without auth', async () => {
    //         const response = await request(app)
    //             .post('/api/v1/posts')
    //             .send(testPost);

    //         expect(response.status).toBe(401);
    //     });

    //     it('should create post with auth', async () => {
    //         const response = await request(app)
    //             .post('/api/v1/posts')
    //             .set('Cookie', [cookie])
    //             .send(testPost);

    //         expect(response.status).toBe(201);
    //         expect(response.body.status).toBe(true);
    //         expect(response.body.data.post).toHaveProperty('id');

    //         postId = response.body.data.post.id;
    //     });

    //     it('should get user posts', async () => {
    //         // Get user id from cookie
    //         // const payload = JSON.parse(Buffer.from(cookie.split('.')[1], 'base64').toString());
    //         // const userId = payload.id; // Extract userId from the decoded payload

    //         const userId = 1;

    //         const response = await request(app)
    //             .get(`/api/v1/users/${userId}/posts`)
    //             .set('Cookie', [cookie]);

    //         expect(response.status).toBe(200);
    //         expect(response.body.status).toBe(true);
    //         expect(Array.isArray(response.body.data.posts)).toBe(true);
    //         expect(response.body.data.posts.length).toBeGreaterThan(0);
    //     });
    // });

    // describe('Comments', () => {
    //     it('should create comment on post', async () => {
    //         const response = await request(app)
    //             .post(`/api/v1/posts/${postId}/comments`)
    //             .set('Cookie', [cookie])
    //             .send({ body: 'Test comment' });

    //         expect(response.status).toBe(201);
    //         expect(response.body.status).toBe(true);
    //         expect(response.body.data.comment).toHaveProperty('id');
    //     });

    //     it('should get post comments', async () => {
    //         const response = await request(app)
    //             .get(`/api/v1/posts/${postId}/comments`)
    //             .set('Cookie', [cookie]);

    //         expect(response.status).toBe(200);
    //         expect(response.body.status).toBe(true);
    //         expect(Array.isArray(response.body.data.comments)).toBe(true);
    //     });

    //     it('should get user comments', async () => {
    //         const response = await request(app)
    //             .get(`/api/v1/users/${userId}/comments`)
    //             .set('Cookie', [cookie]);

    //         expect(response.status).toBe(200);
    //         expect(response.body.status).toBe(true);
    //         expect(Array.isArray(response.body.data.comments)).toBe(true);
    //     });
    // });

    // describe('Error Handling', () => {
    //     it('should handle invalid post id', async () => {
    //         const response = await request(app)
    //             .get('/api/v1/posts/99999')
    //             .set('Cookie', [cookie]);

    //         expect(response.status).toBe(404);
    //         expect(response.body.status).toBe(false);
    //     });

    //     it('should handle invalid login credentials', async () => {
    //         const response = await request(app)
    //             .post('/api/v1/users/login')
    //             .send({
    //                 email: testUser.email,
    //                 password: 'wrongpassword'
    //             });

    //         expect(response.status).toBe(401);
    //         expect(response.body.status).toBe(false);
    //     });

    //     it('should handle missing required fields', async () => {
    //         const response = await request(app)
    //             .post('/api/v1/posts')
    //             .set('Cookie', [cookie])
    //             .send({});

    //         expect(response.status).toBe(400);
    //         expect(response.body.status).toBe(false);
    //     });
    // });
});