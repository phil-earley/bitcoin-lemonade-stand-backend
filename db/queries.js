const knex = require('./knex');

module.exports = {
	address: {
		getAllAddresses: () => {
			return knex('address')
		},
		insertAddress: (addr) => {
			return knex('address')
				.insert(addr)
				.returning(['id', 'address'])
		},
		getAddressId: (addr) => {
			return knex('address')
				.select('id')
				.where({address: addr})
		}
	},
	transaction: {
		getAllTransactions: () => {
			return knex('transaction')
		},
		insertTransaction: (obj) => {
			return knex('transaction')
				.insert(obj)
				.returning(['id', 'btc', 'address_id'])
		},
	}
}
