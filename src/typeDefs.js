const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    firstname: String!
    lastname: String!
    status: String!
  }

  type Transaction {
    id: ID!
    merchant: String!
    amount: Float!
    notes: String!
    status: String!
  }

  type Query {
    hello: String!
    users: [User!]
    user(id: ID!): User!
    transaction(id: ID!): Transaction!
  }

  type Mutation {
    createTransaction(merchant: String!, amount: Float!, notes: String!): Transaction!
    createUser(firstname: String!, lastname: String!): User!
  }

  type Subscription {
    transactionCreated: Transaction!
    transactionUpdated: Transaction!
    userCreated: User!
    userUpdated: User!
  }
`;

module.exports = typeDefs;