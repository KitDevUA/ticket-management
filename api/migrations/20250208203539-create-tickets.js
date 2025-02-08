'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('tickets', {
			ticket_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				unique: true,
			},
			title: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			description: {
				type: Sequelize.TEXT,
				allowNull: false,
			},
			date: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
			},
			location: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			user_type_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'user_types',
					key: 'user_type_id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
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
		await queryInterface.dropTable('tickets');
	},
};
