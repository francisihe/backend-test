const { Sequelize } = require('sequelize');

async function up({ context: queryInterface }) {
    await queryInterface.addColumn('Comments', 'userId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
    });
}

async function down({ context: queryInterface }) {
    await queryInterface.removeColumn('Comments', 'userId');
}

module.exports = { up, down };