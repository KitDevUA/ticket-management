'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('user_types', {
			user_type_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				unique: true,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updated_at: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},

	async down(queryInterface) {
		await queryInterface.dropTable('user_types');
	},
};
