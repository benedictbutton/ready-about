const { gql } = require('apollo-server-express');

module.exports = gql`
  extend type Query {
    word(text: String!): Word
    words: [Word!]!
  }

  extend type Mutation {
    createWord(text: String!): Word!
    deleteWord(text: String!): Boolean!
  }

  type Word {
    text: String!
    createdAt: Date!
  }
`;

// extend type User @key(fields: "id") {
//   id: ID! @external
//   words: [Word]
//
