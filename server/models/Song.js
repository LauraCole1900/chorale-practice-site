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
    practiceTrackUrlSop: {
      type: String
    },
    practiceTrackUrlAlto: {
      type: String
    },
    practiceTrackUrlTen: {
      type: String
    },
    practiceTrackUrlBass: {
      type: String
    },
    videoUrl: {
      type: String
    }
  }
);

const Song = model("Song", songSchema);

module.exports = Song;