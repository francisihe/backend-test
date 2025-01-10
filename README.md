# Senior Backend Test Documentation
- Documented by Francis Ihejirika

## Project Prompt / Question

The prompt for the assessment can be found here: [Project Assessment](./testPrompt.md)

## Deliverables

- Repository: https://github.com/francisihe/backend-test (GitHub)
- Hosted API URL: https://risevest-backend-test-899349118879.us-central1.run.app/ (Google Cloud Run)
- Postman Collection Public URL: 

_The database is a free Render PostgreSQL database_

## Overview

This project is a RESTful API that utilizes **Node.js**, **Express**, **TypeScript** and **PostgreSQL**, containerized with **Docker** and deployed to **Google Cloud Run**. Other techologies used within the project include **Sequelize ORM**, **Umzug** for migrations and **JWT**. The API includes basic user authentication, CRUD operations for users, posts, and comments

I have ensured proper documentation of the different parts of the project, and further broken each section into smaller bits. You can view them individually in the [**docs directory**](./docs/):

### Sub Documentation
- [AUTHENTICATION](./docs/AUTHENTICATION.md): This highlights basic authentication flow within the API
- [DEPLOYMENT](./docs/DEPLOYMENT.md): This shows the indepth deployment steps for Google Cloud Run and covers that of Render as well
- [MIGRATIONS](./docs/MIGRATIONS.md): Migrations are used extensively both in `development` and `production` environments within the codebase. This highlights the migration dependencies, custom migration files, custom script, templates, file structure and commands to run migrations either in dev or prod.

## Mini Project Structure
The files within the repo are grouped into easily understandable directories as follows:


- **config**: Configuration files for the API
    - **constants**: Constants used in application logic, accesses the `process.env` and exports to relevant areas
    - **db**: Database configuration and Sequelize instance
    - **runMigrations.ts**: Migration function for all environments
- **controllers**: Handles the request and response logic
- **docs**: Contains documentation files
- **middleware**: Contains middleware functions and validators
- **migrations**: Contains database migration files
- **models**: Defines the database schemas and models
- **routes**: Defines the API routes
- **scripts**: Contains custom scripts and templates
- **seed**: Dummy data to seed the database, to execute custom queries
- **tests**: Contains unit and integration tests
- **types**: Typescript types


## Custom Scripts

In other to automate some areas within the codebase, and ensure that migrations run properly in both development and in production, I created multiple custom scripts for these. You can inspect the [`package.json`](./package.json) file for full details.

Some of these were also used in the CI/CD pipeline. I deployed this to **Google Cloud Run**, and utilizied **Cloud Build** trigger for **continuous deployment**. Here's a preview of the scripts section:
```
 "scripts": {
    "test": "NODE_ENV=test jest --runInBand",
    "create-migration:dev": "ts-node scripts/createMigration.ts",
    "create-migration:prod": "node dist/scripts/createMigration.js",
    "migration:dev": "ts-node scripts/runMigration.ts",
    "migration:prod": "node dist/scripts/runMigration.js",
    "dev": "NODE_ENV=development && npm run migration:dev && nodemon --watch '**/*.ts' --exec 'ts-node' index.ts",
    "build": "tsc",
    "start": "NODE_ENV=production && npm run migration:prod && node dist/index.js"
  },
```

## Getting Started On Your Local Machine

### Installation

1. **Clone the repository:**
   ```
   git clone https://github.com/francisihe/backend-test.git
   cd backend-test
   ```

2. **Install dependencies:**
    ```
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the root directory of the project.
    Copy the contents of `.env.example` into `.env` and update the values as needed. You should use either `DATABASE_URL` or the group of the other database configuration files which are `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_PORT`. If you use `DATABASE_URL`, it takes precedence as defined in the [`db`](./config/db.ts) file in the [`config`](./config/) directory

4. **Run database migrations (optional):**
    This may not be necessary as it is added into the `dev` command. It automatically runs the migration when you start the server, but if you prefer to manually run the migration, you can do so using the command below:
    ```
    npm run migration:dev
    ```

5. **Seed the database (optional):**
    This is not necessary except you want to manually run the query in the `testPrompt.md`.
    ```
    npm run seed-database
    ```

6. **Running the Application**
    To start the application in development mode, run:
    ```
    npm run dev
    ```
