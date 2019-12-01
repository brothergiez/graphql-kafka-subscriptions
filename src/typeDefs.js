const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    firstname: String!
    lastname: String!
  }

  type Query {
    hello: String!
    users: [User!]
    user(id: ID!): User!
  }

  type Mutation {
    createUser(id: ID!, firstname: String!, lastname: String!): User!
  }

  type Subscription {
    userCreated: User
  }
`;

module.exports = typeDefs;