const { gql } = require('apollo-server-express');

module.exports = gql`
  type Word @key(fields: "id") {
    id: ID!
    text: String!
    createdAt: Date!
  }

  scalar Date

  extend type Query {
    word(id: ID!): Word
    words: [Word]!
  }
`;

// extend type User @key(fields: "id") {
//   id: ID! @external
//   words: [Word]
//
