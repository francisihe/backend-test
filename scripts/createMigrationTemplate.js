const fs = require('fs');
const path = require('path');

const getCurrentTimestamp = () => {
   const now = new Date();
   return now.toISOString().replace(/[-:.]/g, '').split('T')[0] + now.toTimeString().split(' ')[0].replace(/:/g, '');
};

const migrationName = process.argv[2];

if (!migrationName) {
   console.error('Please provide a migration name.');
   process.exit(1);
}

const timestamp = getCurrentTimestamp();
const fileName = `${timestamp}-${migrationName}.js`;

const migrationTemplate = `const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
   // TODO: Add your migration logic here
}

async function down({ context: queryInterface }) {
   // TODO: Add your rollback logic here
}

module.exports = { up, down };
`;

const migrationsDir = path.join(__dirname, 'migrations');

if (!fs.existsSync(migrationsDir)) {
   fs.mkdirSync(migrationsDir);
}

fs.writeFileSync(path.join(migrationsDir, fileName), migrationTemplate.trim());
console.log(`Migration file created: ${fileName}`);


// const fs = require('fs');
// const path = require('path');

// // Get the current timestamp
// const getCurrentTimestamp = () => {
//     const now = new Date();
//     return now.toISOString().replace(/[-:.]/g, '').split('T')[0] + now.toTimeString().split(' ')[0].replace(/:/g, '');
// };

// // Get the migration name from command line arguments
// const migrationName = process.argv[2];

// if (!migrationName) {
//     console.error('Please provide a migration name.');
//     process.exit(1);
// }

// // Create the migration file name
// const timestamp = getCurrentTimestamp();
// const fileName = `${timestamp}-${migrationName}.js`;

// // Define the migration template
// const migrationTemplate = `'use strict';

// module.exports = {
//     up: async (queryInterface, Sequelize) => {
//         // TODO: Add your migration logic here
//     },

//     down: async (queryInterface, Sequelize) => {
//         // TODO: Add your rollback logic here
//     }
// };
// `;

// // Define the migrations directory
// const migrationsDir = path.join(__dirname, 'migrations');

// // Create the migrations directory if it doesn't exist
// if (!fs.existsSync(migrationsDir)) {
//     fs.mkdirSync(migrationsDir);
// }

// // Write the migration file
// fs.writeFileSync(path.join(migrationsDir, fileName), migrationTemplate.trim());
// console.log(`Migration file created: ${fileName}`);