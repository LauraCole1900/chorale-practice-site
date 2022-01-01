const { Schema } = require("mongoose");

const songSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    composer: {
      type: [String],
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
    videoUrl1: {
      type: String
    },
    videoUrl2: {
      type: String
    },
    videoUrl3: {
      type: String
    }
  }
);

module.exports = songSchema;