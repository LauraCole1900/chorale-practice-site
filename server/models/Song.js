const { Schema, model } = require("mongoose");

const songSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    composer: {
      type: String,
      required: true
    },
    publisher: {
      type: String
    },
    copyrightDate: {
      type: String
    },
    practiceTrackUrl: {
      type: String
    },
    videoUrl: {
      type: String
    }
  }
);

const Song = model("Song", songSchema);

module.exports = Song;