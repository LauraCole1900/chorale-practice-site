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
    concerts: async () => {
      return Concert.find({});
    },
    trueConcerts: async () => {
      return await Concert.find({ songs })
    },
    admins: async () => {
      return await User.find({});
    }
  },

  Mutation: {
    addUser: async (_, args) => {
      const user = await User.create(args);
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