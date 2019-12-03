const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    firstname: String!
    lastname: String!
    status: String!
  }

  type Query {
    hello: String!
    users: [User!]
    user(id: ID!): User!
  }

  type Mutation {
    createUser(firstname: String!, lastname: String!): User!
  }

  type Subscription {
    userCreated: User!
    userUpdated: User!
  }
`;

module.exports = typeDefs;