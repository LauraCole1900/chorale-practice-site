const { Concert, Post, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (_, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).select("-__v -password");
      } else {
        throw new AuthenticationError("Must be logged in");
      }
    },

    meProfile: async (_, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).select("-__v -password");
      } else {
        throw new AuthenticationError("Must be logged in");
      }
    },

    currentId: async (_, args) => {
      console.log({ args });
      const user = await User.findOne({ _id: args._id });
      console.log({ user });
      return user;
    },

    admins: async () => {
      return await User.find({ "isAdmin": true });
    },

    allConcerts: async () => {
      return await Concert.find({});
    },

    allPosts: async () => {
      return await Post.find({});
    },

    allUsers: async () => {
      return await User.find({});
    },

    oneConcert: async (_, args) => {
      const concert = await Concert.findOne({ _id: args._id });
      console.log({concert});
      return concert;
    },

    onePost: async (_, args) => {
      return await Post.findOne({ _id: args._id });
    },

    oneDirectorPost: async (_, args) => {
      return await Post.findOne({ _id: args._id, postType: args.postType === "director" })
    },

    oneAdminPost: async (_, args) => {
      return await Post.findOne({ _id: args._id, postType: args.postType === "admin" })
    },

    oneSopSectPost: async (_, args) => {
      return await Post.findOne({ _id: args._id, postType: args.postType === "sopSectAnnouncements" })
    },

    oneAltoSectPost: async (_, args) => {
      return await Post.findOne({ _id: args._id, postType: args.postType === "altoSectAnnouncements" })
    },

    oneTenSectPost: async (_, args) => {
      return await Post.findOne({ _id: args._id, postType: args.postType === "tenSectAnnouncements" })
    },

    oneBassSectPost: async (_, args) => {
      return await Post.findOne({ _id: args._id, postType: args.postType === "bassSectAnnouncements" })
    },

    oneProfile: async (_, args) => {
      return await User.findOne({ _id: args._id });
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

    addPost: async (_, args) => {
      const post = await Post.create(args);
      return post;
    },

    addUser: async (_, args) => {
      const user = await User.create(args);
      return user;
    },

    deleteConcert: async (_, args) => {
      const concert = await Concert.findByIdAndDelete({ _id: args._id });
      return concert;
    },

    deletePost: async (_, args) => {
      const post = await Post.findByIdAndDelete({ _id: args._id });
      return post;
    },

    deleteSong: async (_, { _id, songId }) => {
      const updatedConcert = await Concert.findOneAndUpdate({ _id: _id }, { $pull: { songs: { _id: songId } } }, { new: true });
      return updatedConcert;
    },

    deleteManySongs: async (_, args) => {
      const updatedConcert = await args.songsToDelete.map(song => Concert.findOneAndUpdate({ _id: args._id }, { $pull: { songs: { _id: song } } }, { new: true }));
      return updatedConcert;
    },

    deleteUser: async (_, args) => {
      const user = await User.findByIdAndDelete({ _id: args._id });
      return user;
    },

    editConcertBasic: async (_, args) => {
      const concert = await Concert.findOneAndUpdate({ _id: args._id }, { $set: { ...args } }, { new: true })
      return concert;
    },

    addRepertoire: async (_, args) => {
      const concert = await Concert.findByIdAndUpdate({ _id: args._id }, { $push: { songs: args.songs } }, { new: true })
      return concert;
    },

    editRepertoire: async (_, args) => {
      const concert = await Concert.findOneAndUpdate({ _id: args._id, "songs._id": args.songId }, { $set: { "songs.$": args.songs } }, { new: true })
      return concert;
    },

    editPost: async (_, args) => {
      const post = await Post.findByIdAndUpdate({ _id: args._id }, { $set: { ...args } }, { new: true })
    },

    editUserAdmin: async (_, args) => {
      const user = await User.findOneAndUpdate({ _id: args._id }, { $set: { ...args } }, { new: true });
      return user;
    },

    editUserSelf: async (_, args, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate({ _id: args._id }, { $set: { ...args } }, { new: true });
        const token = signToken(user);
        return { token, user };
      } else {
        throw new AuthenticationError("Must be logged in");
      }
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