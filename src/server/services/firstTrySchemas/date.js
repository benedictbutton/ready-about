const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar Date

  type MyType {
    createdAt: Date!
  }
`;
