const Addresses = require('./data/address');
const Transactions = require('./data/transaction');
const _ = require('lodash');
const queries = require('../db/queries');

let {
	GraphQLString,
	GraphQLInt,
	GraphQLList,
	GraphQLObjectType,
	GraphQLInputObjectType,
	GraphQLNonNull,
	GraphQLSchema,
} = require('graphql');

const AddressType = new GraphQLObjectType({
	name: 'Address',
	description: 'This represents an Address',
	fields: () => ({
		id: {type: GraphQLString},
		address: { type: new GraphQLNonNull(GraphQLString) },
	}),
});

const CreateAddressType = new GraphQLInputObjectType({
	name: 'CreateAddressType',
	type: AddressType,
	fields: {
		address: { type: new GraphQLNonNull(GraphQLString) }
	},
});

const TransactionType = new GraphQLObjectType({
	name: 'Transaction',
	description: 'This represents a transaction',
	fields: () => ({
		id: { type: GraphQLString},
		amount: { type: new GraphQLNonNull(GraphQLString) },
		address_id: { type: new GraphQLNonNull(GraphQLInt) }
	}),
});

const CreateTransactionType = new GraphQLInputObjectType({
	name: 'CreateTransactionType',
	type: TransactionType,
	fields: {
		amount: { type: new GraphQLNonNull(GraphQLString) },
		address: { type: new GraphQLNonNull(GraphQLString) },
	},
});

const TransactionHistorQueryRootType = new GraphQLObjectType({
	name: 'TransactionHistorySchema',
	description: 'Root Query for Transaction History app',
	fields: () => ({
		addresses: {
			type: new GraphQLList(AddressType),
			description: 'List all of the Addresses',
			resolve: () => {
				return queries.address.getAllAddresses();
			},
		},
		transactions: {
			type: new GraphQLList(TransactionType),
			description: 'List all of the Transactions',
			resolve: () => {
				return queries.transaction.getAllTransactions();
			},
		},
	}),
});

const mutationType = new GraphQLObjectType({
	name: 'addNewAddress',
	description: 'Things we can change',
	fields: () => ({
		addAddress: {
			type: AddressType,
			description: 'Add a new address',
			args: {
				input: { type: new GraphQLNonNull(CreateAddressType) },
			},
			resolve: (value, { input }) => {
				return queries.address.insertAddress(input)
					.then(res => res[0]);
			},
		},
		addTransaction: {
			type: TransactionType,
			description: 'Add a new transaction',
			args: {
				input: { type: new GraphQLNonNull(CreateTransactionType) }
			},
			resolve: (value, { input }) => {
				return queries.address.getAddressId(input.address)
					.then(res => {
						return queries.transaction.insertTransaction({
							amount: input.amount.toString(),
							address_id: res[0].id
						})
						.then(res => res[0])
					})
			}
		}
	}),
});

const TransactionHistrySchema = new GraphQLSchema({
	query: TransactionHistorQueryRootType,
	mutation: mutationType,
});

module.exports = TransactionHistrySchema;