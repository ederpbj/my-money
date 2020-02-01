const { gql } = require('apollo-server');

const schema = gql`
  type Query {
    broker(id: ID!): Broker
    brokers: [Broker]!
    investment(id: ID!): Investment
    investments: [Investment]!
  }
  type Mutation {
    createBroker(data: BrokerInput!): Broker
    deleteBroker(where: BrokerWhere!): Broker
    createInvestment(data: InvestmentInput!): Investment
    deleteInvestment(where: InvestmentWhere!): Investment
  }
  type Subscription {
    broker(where: BrokerSubscriptionFilter!): BrokerSubscriptionPayload
    investment(where: InvestmentSubscriptionFilter!): InvestmentSubscriptionPayload
  }
  type Broker {
    id: ID!
    name: String!
  }
  type Investment {
    id: ID!
    name: String!
  }
  input BrokerInput {
    name: String!
  }
  input InvestmentInput {
    name: String!
  }
  input BrokerWhere {
    id: ID!
  }
  input InvestmentWhere {
    id: ID!
  }
  input BrokerSubscriptionFilter {
    mutation_in: [ModelMutationType!]
  }
  input InvestmentSubscriptionFilter {
    mutation_in: [ModelMutationType!]
  }
  type BrokerSubscriptionPayload {
    mutation: ModelMutationType
    node: Broker
    previousValues: Broker
  }
  type InvestmentSubscriptionPayload {
    mutation: ModelMutationType
    node: Investment
    previousValues: Investment
  }
  enum ModelMutationType {
    CREATED
    UPDATED
    DELETED
  }
`;
module.exports = schema;
