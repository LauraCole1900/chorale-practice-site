const { Concert, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (_, args, context) => {
      return await User.findOne({ _id: args._id }).select("-__v -password");
    },

    meProfile: async (_, args, context) => {
      return await User.findOne({ _id: args._id }).select("-__v -password");
    },

    admins: async () => {
      return await User.find({ "isAdmin": true });
    },

    allConcerts: async () => {
      return await Concert.find({});
    },

    allUsers: async () => {
      return await User.find({});
    },

    oneUser: async (_, args) => {
      return await User.findOne({ _id: args._id });
    },

    oneUserAdmin: async (_, args) => {
      return await User.findOne({ _id: args._id });
    },

    trueConcerts: async () => {
      return await Concert.find({ "songs": { $exists: true, $ne: [] } });
    },
  },

  Mutation: {
    addConcert: async (_, args) => {
      const concert = await Concert.create(args);
      return concert;
    },

    addUser: async (_, args) => {
      const user = await User.create(args);
      return user;
    },

    deleteConcert: async (_, args) => {
      const concert = await Concert.findByIdAndDelete({ _id: args._id });
      return concert;
    },

    deleteUser: async (_, args) => {
      const user = await User.findByIdAndDelete({ _id: args._id });
      return user;
    },

    editConcertBasic: async (_, args) => {
      const concert = await Concert.findOneAndUpdate({ _id: args._id }, { $set: { ...args } }, { new: true })
      return concert;
    },

    editConcertRepertoire: async (_, args) => {
      const concert = await Concert.findOneAndUpdate({ _id: args._id }, { $set: { ...args } }, { new: true })
      return concert;
    },

    editUserAdmin: async (_, args) => {
      const user = await User.findOneAndUpdate({ _id: args._id }, { $set: { ...args } }, { new: true });
      return user;
    },

    editUserSelf: async (_, args) => {
      const user = await User.findOneAndUpdate({ _id: args._id }, { $set: { ...args } }, { new: true });
      const token = signToken(user);
      return { token, user };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email1: email });
      // If user email isn't found, throw auth error
      if (!user) {
        throw new AuthenticationError("Login failed. Try again");
      }
      // Check password
      const correctPassword = await user.isCorrectPassword(password);
      // If incorrect password, throw auth error
      if (!correctPassword) {
        throw new AuthenticationError("Login failed. Try again");
      }
      const token = signToken(user);
      return { token, user };
    },
  }
}

module.exports = resolvers;