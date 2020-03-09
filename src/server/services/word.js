import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import wordResolver from '../resolvers/word';
import wordSchema from '../schema/word';

const word = () => {
  const server = new ApolloServer({
    schema: buildFederatedSchema([
      { typeDefs: wordSchema, resolvers: wordResolver },
    ]),
  });

  server.listen(4001).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

export default word;
