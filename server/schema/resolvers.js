const { Concert, Post, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const bcrypt = require("bcrypt");
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
      return await User.findOne({ _id: args._id });
    },

    admins: async () => {
      return await User.find({ "isAdmin": true });
    },

    allBirthdays: async () => {
      return await User.find({});
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
      return await Concert.findOne({ _id: args._id });
    },

    onePost: async (_, args) => {
      console.log({ args });
      return await Post.findOne({ _id: args._id });
    },

    oneDirectorPost: async (_, args) => {
      return await Post.findOne({ _id: args._id, postType: args.postType === "director" }).sort({ "postDate": -1 });
    },

    oneAdminPost: async (_, args) => {
      return await Post.findOne({ _id: args._id, postType: args.postType === "admin" }).sort({ "postDate": -1 });
    },

    oneSectPost: async (_, args) => {
      return await Post.findOne({ postType: args.postType, postSection: args.postSection }).sort({ "postDate": -1 });
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
      const concert = await Concert.findOne({ _id: args._id });
      let keepSongs = concert.songs;
      await args.songsToDelete.forEach(song => {
        keepSongs = keepSongs.filter(concertSong => concertSong._id != song);
      });
      const updatedConcert = await Concert.findByIdAndUpdate({ _id: args._id }, { $set: { songs: keepSongs } }, { new: true });
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
      console.log({ args });
      const concert = await Concert.findOneAndUpdate({ _id: args._id, "songs._id": args.songId }, {
        $set: {
          "songs.$": {
            title: args.title, composer: args.composer, concertOrder: args.concertOrder, practiceTrackUrlsSopSlow: args.practiceTrackUrlsSopSlow, practiceTrackUrlsAltoSlow: args.practiceTrackUrlsAltoSlow, practiceTrackUrlsTenSlow: args.practiceTrackUrlsTenSlow, practiceTrackUrlsBassSlow: args.practiceTrackUrlsBassSlow, practiceTrackUrlsSopATempo: args.practiceTrackUrlsSopATempo, practiceTrackUrlsAltoATempo: args.practiceTrackUrlsAltoATempo, practiceTrackUrlsTenATempo: args.practiceTrackUrlsTenATempo, practiceTrackUrlsBassATempo: args.practiceTrackUrlsBassATempo, videoUrls: args.videoUrls
          }
        }
      }, { new: true });
      console.log({ concert });
      return concert;
    },

    editPassword: async (_, args) => {
      const currentUser = await User.findOne({ _id: args._id });
      const correctPassword = await bcrypt.compare(args.oldPassword, currentUser.password);
      if (correctPassword) {
        const saltRounds = 10;
        args.password = await bcrypt.hash(args.password, saltRounds);
        const user = await User.findByIdAndUpdate({ _id: args._id }, { $set: { password: args.password } });
        return user;
      }
    },

    editPost: async (_, args) => {
      const post = await Post.findByIdAndUpdate({ _id: args._id }, { $set: { ...args } }, { new: true });
      return post;
    },

    editUserAdmin: async (_, args) => {
      if (args.password) {
        const saltRounds = 10;
        args.password = await bcrypt.hash(args.password, saltRounds);
      }
      const user = await User.findOneAndUpdate({ _id: args._id }, { $set: { ...args } }, { new: true });
      return user;
    },

    editUserSelf: async (_, args, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate({ _id: context.user._id }, { $set: { ...args } }, { new: true });
        return user;
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