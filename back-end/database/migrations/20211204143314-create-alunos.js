'use strict';
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('alunos', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			nome: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			endereco: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			foto: {
				type: Sequelize.BLOB,
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("now"),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn("now"),
			},
			deleted_at: {
				allowNull: true,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('alunos');
	}
};