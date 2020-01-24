const { gql} = require('apollo-server');

const schema = gql`

scalar Date

type Query {
  brokers(limit: Int): [Broker]
  broker(id: ID!): Broker
  investments(limit: Int): [Investment]
  investment(id: ID!): Investment
}

type Broker {
  id: ID!
  name: String!
  investments: [Investment]
}

type Investment {
  id: ID!
  name: String!
  broker: Broker
  balanceUpdates(limit: Int, order: [[String]]): [BalanceUpdate]
  transactions: [Transaction]
}

type BalanceUpdate {
  id: ID!
  amount: Float!
  date: Date!
}

type Transaction {
  id: ID!
  amount: Float!
  date: Date!
}

enum ModelMutationType{
	CREATED
	UPDATED
	DELETED
}
`;
module.exports = schema;