const faker = require('faker');

module.exports = {
	up: async (queryInterface) => {
		const [existing] = await queryInterface.sequelize.query(
			'SELECT ticket_id FROM "tickets" LIMIT 1;',
		);
		if (existing.length > 0) {
			return;
		}

		const tickets = [];
		for (let i = 0; i < 100; i++) {
			const city = faker.address.city();
			tickets.push({
				title: `Ticket to ${city}`,
				description: faker.lorem.paragraph(),
				date: faker.date.future(),
				location: city,
				user_type_id: Math.random() > 0.5 ? 1 : 2,
				created_at: new Date(),
				updated_at: new Date(),
			});
		}
		await queryInterface.bulkInsert('tickets', tickets, {});
	},
	down: async (queryInterface) => {
		await queryInterface.bulkDelete('tickets', null, {});
	},
};
