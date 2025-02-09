const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const config = {
	local: {
		username: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DB,
		host: process.env.POSTGRES_HOST,
		port: parseInt(process.env.POSTGRES_PORT, 10),
		dialect: 'postgres',
		timezone: process.env.POSTGRES_TIMEZONE,
	},
	production: {
		username: process.env.POSTGRES_USER,
		password: process.env.POSTGRES_PASSWORD,
		database: process.env.POSTGRES_DB,
		host: process.env.POSTGRES_HOST,
		port: parseInt(process.env.POSTGRES_PORT, 10),
		dialect: 'postgres',
		timezone: process.env.POSTGRES_TIMEZONE,
	},
};

module.exports = config;
