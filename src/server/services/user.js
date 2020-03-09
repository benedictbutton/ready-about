import { ApolloServer, gql } from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import mongoose from 'mongoose';
import userResolver from '../resolvers/user';
import userSchema from '../schema/user';

const User = require('../models/user');

const user = async () => {
  const server = new ApolloServer({
    schema: buildFederatedSchema([
      { typeDefs: userSchema, resolvers: userResolver },
    ]),
    // context: async ({ req }) => {
    //   return { User };
    // },
  });

  await mongoose.connect(
    'mongodb+srv://bdaly:4J8U-rGwv5r.jQj@cluster0-vof2w.mongodb.net/test?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
    },
  );

  server.listen(4002).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
};

export default user;
