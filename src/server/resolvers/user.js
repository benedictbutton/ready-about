const mongoose = require('mongoose');

String.prototype.toObjectId = function() {
  var ObjectId = require('mongoose').Types.ObjectId;
  return new ObjectId(this.toString());
};

module.exports = {
  Query: {
    users: async (parent, args, { me, models }) => {
      return await models.User.findAll();
    },
    user: async (parent, args, { me, models }) => {
      return await models.User.findById(me.id);
    },
    me: async (parent, args, { me, models }) => {
      if (!me) return null;
      return await models.User.findById(me.id);
    },
  },
  Mutation: {
    editUser: async (
      parent,
      { id, editProp, edit },
      { me, models },
    ) => {
      try {
        let { edit, editProp } = req.body.user;
        if (editProp === 'phoneNumber')
          edit = formatPhoneNumber(edit);
        const user = await models.User.findOneAndUpdate(
          { me },
          { [editProp]: edit },
          { upsert: true, new: true },
        );
        return {
          user,
          editField: editProp,
          edit,
        };
      } catch (err) {
        res.status(err.statusCode || 502).json(err.error || err);
      }
    },
    addHistory: async (parent, { text }, { me, models }) => {
      try {
        const word = await models.Word.findOneAndUpdate(
          { text },
          { words: { text } },
          { upsert: true, new: true },
        );
        const user = await models.User.update(
          { username: me.username },
          { $addToSet: { 'words.history': word } },
          { upsert: true, new: true },
        );
        return word;
      } catch (error) {
        console.log(error);
      }
    },
    deleteWords: async (parent, { _id }, { me, models }) => {
      try {
        const user = await models.User.findById(me.id);
        await models.User.findOneAndUpdate(
          { _id: user.id },
          { $pullAll: { 'words.history': _id } },
          { new: false, upsert: true },
        );
        return user.words.history;
      } catch (error) {
        console.log(error);
      }
    },
  },
  User: {
    wordsHistory: async (parent, args, { me, models }) => {
      const user = await models.User.findById(me.id).populate(
        'words.history',
      );

      return user.words.history;
    },
  },
};

// deleteUser: combineResolvers(
//   isAdmin,
//   async (parent, { id }, { models }) => {
//     return await models.User.destroy({
//       where: { id },
//     });
//   },
// ),
// },

//   User: {
//       history: async (user, args) => {
//         return await user.history
//       },
//     },
//   },
// };

// models.Word.findAll({
//   where: {
//     userId: user.id,
//   },
// });

// let songs = await Song.find({ _id: { $in: list } });

// signIn: async (
//       parent,
//       { login, password },
//       { models, secret },
//     ) => {
//       const user = await models.User.findByLogin(login);
//
//       if (!user) {
//         throw new UserInputError('No user found.');
//       }
//
//       const isValid = await user.validatePassword(password);
//
//       if (!isValid) {
//         throw new AuthenticationError('Invalid password.');
//       }
//       return { token: createToken(user, secret, '30m') };
//     },
