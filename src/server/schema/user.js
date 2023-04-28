const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    users: [User!]
    user: User!
    me: User
  }

  extend type Mutation {
    editUser(id: ID!, edit: String!, editProp: String!): Edits!
    addHistory(text: String!): Word!
    deleteWords(_id: [ID]!): User
  }

  type Edits {
    user: User!
    editField: String!
    edit: String!
  }

  type User {
    id: ID!
    username: String!
    phoneNumber: String!
    avatar: String!
    wordsHistory: [Word!]
  }
`;

// signUp(
//   username: String!
//   email: String!
//   password: String!
// ): Token!
//
// deleteUser(id: ID!): Boolean!
