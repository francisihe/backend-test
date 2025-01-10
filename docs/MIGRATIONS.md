# Migrations Documentation
- Documented by Francis Ihejirika

## Overview

This is a quick overview on how I handled and recommend handling migrations in the Rise Backend Test API. 

This project utilizes **Sequelize** and **Umzug** for handling migrations in a PostgreSQL database.

### External Resource
- [Sequelize](https://sequelize.org): This is the ORM used in the project. I used the PostgreSQL dialect.


- [Umzug](https://github.com/sequelize/umzug): According to the official readme on GitHub, Umzug is a framework-agnostic migration tool for Node. It provides a clean API for running and rolling back tasks.

## Migration Structure

Migrations are stored in the `migrations` directory at the root of the project. Each migration file is named using a timestamp followed by a descriptive name, ensuring that migrations are applied in the correct order.

I created a script template to generate the naming structure: using the current time of the file generation and the preferred name you give it at that time.

### Creating a migration file

You can do this using the appropriate script depending on the environment, as defined in the [package.json](../package.json) file.


1. To generate a migration file, assuming I am adding a "role" column in my `userModel` file. I would do this in my terminal:

```
(localhost)

npm run create-migration:dev add-role-in-user-model

(production)

npm run create-migration:prod add-role-in-user-model
```

_Note: It is not advisable to run it in prod, hence why I added the command in the build command instead_

#

This will create a `add-role-in-user-model.js` file in the `migrations` directory with just a template. The file generated would look something like this:

```
const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
    // TODO: Add your migration logic here
}

async function down({ context: queryInterface }) {
    // TODO: Add your rollback logic here
}

module.exports = { up, down };
```


You then have to specify the exact commands within the file. Next, you can run the migration command depending on your environment:

```
(localhost)
npm run migration:dev

(localhost)
npm run migration:prod
```

If successful, you can start your server.
If errors are thrown, you should troubleshoot before restarting the server.
