const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
    await queryInterface.createTable('Posts', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        content: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // Ensure this matches the table name
                key: 'id',
            },
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'), // Use NOW() for default value
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn('NOW'), 
        },
    });
}

async function down({ context: queryInterface }) {
    await queryInterface.dropTable('Posts');
}

module.exports = { up, down };