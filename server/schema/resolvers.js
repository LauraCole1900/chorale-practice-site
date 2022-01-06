const { Concert, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id }).select("-__v -password");
      }
      throw new AuthenticationError("You must be logged in!");
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
      return await User.findOne(args);
    },

    trueConcerts: async () => {
      return await Concert.find({ "songs": { $exists: true, $ne: [] } });
    },
  },

  Mutation: {
    addUser: async (_, args) => {
      const user = await User.create(args);
      return user;
    },

    editUserAdmin: async (_, args) => {
      const user = await User.findOneAndUpdate(args);
      return user;
    },

    editUserSelf: async (_, args) => {
      const user = await User.findOneAndUpdate(args);
      const token = signToken(user);
      return { token, user };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
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