import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Set the migrations directory relative to the project root
const migrationsDir = path.resolve(process.cwd(), 'migrations');

// Get the current timestamp
const getCurrentTimestamp = (): string => {
    const now = new Date();
    return now.toISOString().replace(/[-:.]/g, '').split('T')[0] + now.toTimeString().split(' ')[0].replace(/:/g, '');
};

// Get the migration name from command line arguments
const migrationName = process.argv[2];

if (!migrationName) {
    console.error('Please provide a migration name.');
    process.exit(1);
}

// Create the migration file name
const timestamp = getCurrentTimestamp();
const fileName = `${timestamp}-${migrationName}.js`;

// Define the migration template

const migrationTemplate = `const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
    // TODO: Add your migration logic here
}

async function down({ context: queryInterface }) {
    // TODO: Add your rollback logic here
}

module.exports = { up, down };
`;

// Ensure the migrations directory exists
if (!fs.existsSync(migrationsDir)) {
    fs.mkdirSync(migrationsDir, { recursive: true });
}

// Write the migration file
fs.writeFileSync(path.join(migrationsDir, fileName), migrationTemplate.trim());
console.log(`Migration file created: ${fileName}`);
