const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User!
  }

  extend type Mutation {
    editUser(id: ID!, edit: String!, editProp: String!): Edits!
  }

  type Edits {
    user: User!
    editField: String!
    edit: String!
  }

  extend type Word @key(fields: "id") {
    id: ID! @external
  }

  type User @key(fields: "id") {
    id: ID!
    username: String!
    phoneNumber: String!
    avatar: String!
    words: [Word!] @provides(fields: "id")
  }
`;

// signUp(
//   username: String!
//   email: String!
//   password: String!
// ): Token!
//
// deleteUser(id: ID!): Boolean!
