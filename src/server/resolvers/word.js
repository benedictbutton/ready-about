module.exports = {
  Query: {
    words: async (parent, args, { models }) => {
      return await models.Word.findAll();
    },
    word: async (parent, { text }, { models }) => {
      return await models.Word.find({ text });
    },
  },
  Mutation: {
    createWord: async (parent, { text }, { me, models }) => {
      try {
        return await models.Word.create({
          text,
        });
      } catch (error) {
        throw new Error('My custom error message');
      }
    },

    deleteWord: async (parent, { text }, { models }) => {
      return await models.Word.destroy({ where: { text } });
    },
  },

  // __resolverReference
  // Word: {
  //   user: async (message, args, { models }) => {
  //     return await models.User.findById(word.userId);
  //   },
  // },
};

// User: {
//     __resolveReference(user, { fetchUserById }){
//       return fetchUserById(user.id)
//     }
//   }
