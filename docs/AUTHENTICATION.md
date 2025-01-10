# Authentication Documentation

## Overview

The API uses JSON Web Tokens (JWT) for secure authentication and authorization of users and bycryptjs for hashing passwords.

When a user logs in successfully, a token is issued and stored as a cookie, using httpOnly to prevent access to the valid tokens. 

## Authentication Flow

1. **User Registration**: Users can register by providing their username, name, email, and password. The password is hashed before being stored in the database for security.

2. **User Login**: Users can log in by providing their credentials (email and password). Upon successful authentication, a JWT is generated and returned to the user's client.

3. **Token Storage**: The JWT is stored on the client-side in cookies

4. **Protected Routes**: For routes that require authentication, the JWT must be included in the cookie request headers.

## Middelware

The `middleware/authentication/verifyUser` checks for the presence of the token, confirms its validity and decodes the jwt