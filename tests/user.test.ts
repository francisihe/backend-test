import request from 'supertest';
import app from '../index';
import sequelize from '../config/db';

beforeAll(async () => {
    try {
        await sequelize.sync({ force: true });

        // Create user in the database for login test
        await request(app)
            .post('/api/v1/users')
            .send({
                username: 'existinguser',
                name: 'Existing User',
                email: 'existinguser@gmail.com',
                password: 'password',
            });

    } catch (error) {
        console.error('Database sync error:', error);
    }
});

afterAll(async () => {
    await sequelize.close();
});

describe('User Login And Creation', () => {

    const newUser1 = {
        username: 'newuser1',
        name: 'New User 1',
        email: 'newuser1@gmail.com',
        password: 'password',
    };

    it('should create a new user', async () => {
        const response = await request(app)
            .post('/api/v1/users')
            .send(newUser1);

        expect(response.status).toBe(201);
        expect(response.body.status).toBe(true);
        expect(response.body.data.user).toHaveProperty('id');
    });

    it('should not create duplicate user', async () => {
        const response = await request(app)
            .post('/api/v1/users')
            .send(newUser1);

        expect(response.status).toBe(400);
        expect(response.body.status).toBe(false);
    });


    it('should login an existing user', async () => {
        const response = await request(app)
            .post('/api/v1/users/login')
            .send({
                email: 'existinguser@gmail.com',
                password: 'password',
            });

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
    });

    it('should login an existing user and assign a cookie', async () => {
        const response = await request(app)
            .post('/api/v1/users/login')
            .send({
                email: 'existinguser@gmail.com',
                password: 'password',
            });

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
        expect(response.headers['set-cookie']).toBeDefined();
    });

    it('should not login non-existing user', async () => {
        const response = await request(app)
            .post('/api/v1/users/login')
            .send({
                email: 'nonexistinguser@gmail.com',
                password: 'password',
            });

        expect(response.status).toBe(401);
        expect(response.body.status).toBe(false);
    });

    it('should not login user with wrong password', async () => {
        const response = await request(app)
            .post('/api/v1/users/login')
            .send({
                email: 'existinguser@gmail.com',
                password: 'wrongPassword'
            });

        expect(response.status).toBe(401);
        expect(response.body.status).toBe(false);
    });

    it('should logout user', async () => {
        const response = await request(app)
            .get('/api/v1/users/logout');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);
    });
});

describe('User Cookie Cleared', () => {

    beforeEach(async () => {
        try {

            // Login the user
            await request(app)
                .post('/api/v1/users/login')
                .send({
                    email: 'existinguser@gmail.com',
                    password: 'password',
                });
        } catch (error) {
            console.error('Database sync error:', error);
        }
    });

    it('should clear user cookie after logout', async () => {
        const response = await request(app)
            .get('/api/v1/users/logout');

        expect(response.status).toBe(200);
        expect(response.body.status).toBe(true);

        // Confirm that the token exists but has an empty value
        const cookie = response.headers['set-cookie'][0];
        expect(cookie).toContain('token=');
        expect(cookie).toMatch(/token=;/);
    });
});
