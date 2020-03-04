module.exports = {
	development: {
		client: 'postgres',
		connection: 'postgres://localhost:5432/bitcoin_lemonade'
	},
	production: {
		client: 'postgres',
		connection: process.env.DATABASE_URL
	}
}
