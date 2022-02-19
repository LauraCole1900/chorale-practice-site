const { Concert, Post, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const bcrypt = require("bcrypt");
const { signToken } = require("../utils/auth");


const trimArr = (arr) => {
  if (arr && arr.length > 0) {
    return arr.map(item => item.trim());
  } else {
    return []
  }
}


const resolvers = {

  //=====================//
  //       Queries       //
  //=====================//
  Query: {

    //=====================//
    //   Concert Queries   //
    //=====================//

    allConcerts: async () => {
      return await Concert.find({});
    },

    oneConcert: async (_, args) => {
      return await Concert.findOne({ _id: args._id });
    },

    // Returns events that have a non-empty songs array
    trueConcerts: async () => {
      return await Concert.find({ "songs": { $exists: true, $ne: [] } });
    },


    //=====================//
    //     Post Queries    //
    //=====================//

    allPosts: async () => {
      return await Post.find({});
    },

    onePost: async (_, args) => {
      return await Post.findOne({ _id: args._id });
    },

    oneAdminPost: async (_, args) => {
      return await Post.findOne({ _id: args._id, postType: args.postType === "admin" }).sort({ "postDate": -1 });
    },

    oneDirectorPost: async (_, args) => {
      return await Post.findOne({ _id: args._id, postType: args.postType === "director" }).sort({ "postDate": -1 });
    },

    oneSectPost: async (_, args) => {
      return await Post.findOne({ postType: args.postType, postSection: args.postSection }).sort({ "postDate": -1 });
    },


    //=====================//
    //     User Queries    //
    //=====================//

    admins: async () => {
      return await User.find({ "isAdmin": true });
    },

    allBirthdays: async () => {
      return await User.find({});
    },

    allUsers: async () => {
      return await User.find({});
    },

    currentId: async (_, args) => {
      return await User.findOne({ _id: args._id });
    },

    // Uses the ID stored in context to find logged-in user
    me: async (_, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).select("-__v -password");
      } else {
        throw new AuthenticationError("Must be logged in");
      }
    },

    // Uses the ID stored in context to find logged-in user and returns profile information
    meProfile: async (_, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).select("-__v -password");
      } else {
        throw new AuthenticationError("Must be logged in");
      }
    },

    oneProfile: async (_, args) => {
      return await User.findOne({ _id: args._id });
    },

    oneUser: async (_, args) => {
      return await User.findOne({ _id: args._id });
    },

    oneUserAdmin: async (_, args) => {
      return await User.findOne({ _id: args._id });
    }
  },


  //=====================//
  //      Mutations      //
  //=====================//
  Mutation: {

    //=====================//
    //  Concert Mutations  //
    //=====================//

    addConcert: async (_, args) => {
      const concert = await Concert.create(args);
      return concert;
    },

    deleteConcert: async (_, args) => {
      const concert = await Concert.findByIdAndDelete({ _id: args._id });
      return concert;
    },

    // Edits non-repertoire event information
    editConcertBasic: async (_, args) => {
      const concert = await Concert.findOneAndUpdate({ _id: args._id }, { $set: { ...args } }, { new: true })
      return concert;
    },


    //=====================//
    //    Song Mutations   //
    //=====================//

    addRepertoire: async (_, args) => {
      const trimComposer = trimArr(args.songs.composer);
      const trimSopUrl = trimArr(args.songs.practiceTrackUrlsSop);
      const trimSopTitle = trimArr(args.songs.practiceTrackTitlesSop);
      const trimAltoUrl = trimArr(args.songs.practiceTrackUrlsAlto);
      const trimAltoTitle = trimArr(args.songs.practiceTrackTitlesAlto);
      const trimTenUrl = trimArr(args.songs.practiceTrackUrlsTen);
      const trimTenTitle = trimArr(args.songs.practiceTrackTitlesTen);
      const trimBassUrl = trimArr(args.songs.practiceTrackUrlsBass);
      const trimBassTitle = trimArr(args.songs.practiceTrackTitlesBass);
      const trimVideoUrl = trimArr(args.songs.videoUrls);
      const songToAdd = {
        title: args.songs.title, composer: trimComposer, concertOrder: args.songs.concertOrder, publisher: args.songs.publisher, copyrightDate: args.songs.copyrightDate, practiceTrackUrlsSop: trimSopUrl, practiceTrackTitlesSop: trimSopTitle, practiceTrackUrlsAlto: trimAltoUrl, practiceTrackTitlesAlto: trimAltoTitle, practiceTrackUrlsTen: trimTenUrl, practiceTrackTitlesTen: trimTenTitle, practiceTrackUrlsBass: trimBassUrl, practiceTrackTitlesBass: trimBassTitle, videoUrls: trimVideoUrl
      };
      const concert = await Concert.findByIdAndUpdate({ _id: args._id }, { $push: { songs: songToAdd } }, { new: true });
      return concert;
    },

    deleteSong: async (_, { _id, songId }) => {
      const updatedConcert = await Concert.findOneAndUpdate({ _id: _id }, { $pull: { songs: { _id: songId } } }, { new: true });
      return updatedConcert;
    },

    // Finds the relevant concert by ID, then loops through the provided array of song IDs
    // and filters those songs out, then sets the remaining songs on the concert as the songs array
    deleteManySongs: async (_, args) => {
      const concert = await Concert.findOne({ _id: args._id });
      let keepSongs = concert.songs;
      await args.songsToDelete.forEach(song => {
        keepSongs = keepSongs.filter(concertSong => concertSong._id != song);
      });
      const updatedConcert = await Concert.findByIdAndUpdate({ _id: args._id }, { $set: { songs: keepSongs } }, { new: true });
      return updatedConcert;
    },

    // Finds the relevant concert by ID, then the relevant song by its ID and sets the updated information
    // on the song subdocument. ID is included in the information to be set because if it isn't, the song's ID
    // gets reset to match the concert's ID
    editRepertoire: async (_, args) => {
      const trimComposer = trimArr(args.composer);
      const trimSopUrl = trimArr(args.practiceTrackUrlsSop);
      const trimSopTitle = trimArr(args.practiceTrackTitlesSop);
      const trimAltoUrl = trimArr(args.practiceTrackUrlsAlto);
      const trimAltoTitle = trimArr(args.practiceTrackTitlesAlto);
      const trimTenUrl = trimArr(args.practiceTrackUrlsTen);
      const trimTenTitle = trimArr(args.practiceTrackTitlesTen);
      const trimBassUrl = trimArr(args.practiceTrackUrlsBass);
      const trimBassTitle = trimArr(args.practiceTrackTitlesBass);
      const trimVideoUrl = trimArr(args.videoUrls);
      const concert = await Concert.findOneAndUpdate({ _id: args._id, "songs._id": args.songId }, {
        $set: {
          "songs.$": {
            _id: args.songId, title: args.title, composer: trimComposer, concertOrder: args.concertOrder, copyrightDate: args.copyrightDate, publisher: args.publisher, practiceTrackUrlsSop: trimSopUrl, practiceTrackTitlesSop: trimSopTitle, practiceTrackUrlsAlto: trimAltoUrl, practiceTrackTitlesAlto: trimAltoTitle, practiceTrackUrlsTen: trimTenUrl, practiceTrackTitlesTen: trimTenTitle, practiceTrackUrlsBass: trimBassUrl, practiceTrackTitlesBass: trimBassTitle, videoUrls: trimVideoUrl
          }
        }
      }, { new: true });
      const song = concert.songs.filter(song => song._id == args.songId);
      return song[0];
    },


    //=====================//
    //    Post Mutations   //
    //=====================//

    addPost: async (_, args) => {
      const post = await Post.create(args);
      return post;
    },

    deletePost: async (_, args) => {
      const post = await Post.findByIdAndDelete({ _id: args._id });
      return post;
    },

    editPost: async (_, args) => {
      const post = await Post.findByIdAndUpdate({ _id: args._id }, { $set: { ...args } }, { new: true });
      return post;
    },


    //=====================//
    //    User Mutations   //
    //=====================//

    addUser: async (_, args) => {
      const user = await User.create(args);
      return user;
    },

    deleteUser: async (_, args) => {
      const user = await User.findByIdAndDelete({ _id: args._id });
      return user;
    },

    // Finds relevant user by ID, then compares the entered existing password to the one
    // in the database. If they match, then hashes the new password and sets it into the
    // database
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

    // If the password is included, it gets hashed here
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
    }
  }
}

module.exports = resolvers;