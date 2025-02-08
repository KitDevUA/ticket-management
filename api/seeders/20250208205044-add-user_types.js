module.exports = {
	up: async (queryInterface) => {
		const [existing] = await queryInterface.sequelize.query(
			'SELECT user_type_id FROM "user_types" LIMIT 1;',
		);
		if (existing.length > 0) {
			return;
		}

		await queryInterface.bulkInsert(
			'user_types',
			[
				{
					name: 'local',
					created_at: new Date(),
					updated_at: new Date(),
				},
				{
					name: 'tourist',
					created_at: new Date(),
					updated_at: new Date(),
				},
			],
			{},
		);
	},
	down: async (queryInterface) => {
		await queryInterface.bulkDelete('user_types', null, {});
	},
};
