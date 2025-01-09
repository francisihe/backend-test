const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
    await queryInterface.createTable('Comments', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        body: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        postId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Posts', // Ensure this matches the table name
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
    await queryInterface.dropTable('Comments');
}

module.exports = { up, down };