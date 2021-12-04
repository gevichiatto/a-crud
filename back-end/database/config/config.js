require('dotenv').config({
	path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const log = process.env.SEQUELIZE_LOGGING ? console.log : false;

module.exports = {
	development: {
		host: process.env.DB_HOST || 'localhost',
		port: 5432,
		username: process.env.DB_USER || 'postgres',
		password: process.env.DB_PASSWORD || 'postgres',
		dialect: 'postgres',
		database: process.env.DATABASE || 'a_crud_dev',
		logging: log,
		pool: {
			max: 20,
			min: 0,
			evict: 10000,
			idle: 10000,
		},
	},

	test: {
		host: 'localhost',
		port: 5432,
		username: 'postgres',
		password: 'root',
		dialect: 'postgres',
		database: process.env.DB_NAME,
		logging: log,
		pool: {
			max: 20,
			min: 0,
			evict: 10000,
			idle: 10000,
		},
	},

	production: {
		host: process.env.DB_HOST,
		port: 5432,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		dialect: 'postgres',
		database: process.env.DATABASE,
		logging: log,
		pool: {
			max: 20,
			min: 0,
			evict: 10000,
			idle: 10000,
		},
	},

	staging: {
		host: process.env.DB_HOST,
		port: 5432,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		dialect: 'postgres',
		database: process.env.DATABASE,
		logging: log,
		pool: {
			max: 20,
			min: 0,
			evict: 10000,
			idle: 10000,
		},
	},
};
