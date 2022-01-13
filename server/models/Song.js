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
    concertOrder: {
      type: Number
    },
    publisher: {
      type: String
    },
    copyrightDate: {
      type: String
    },
    practiceTrackUrlsSopSlow: {
      type: [String]
    },
    practiceTrackUrlsAltoSlow: {
      type: [String]
    },
    practiceTrackUrlsTenSlow: {
      type: [String]
    },
    practiceTrackUrlsBassSlow: {
      type: [String]
    },
    practiceTrackUrlsSopATempo: {
      type: [String]
    },
    practiceTrackUrlsAltoATempo: {
      type: [String]
    },
    practiceTrackUrlsTenATempo: {
      type: [String]
    },
    practiceTrackUrlsBassATempo: {
      type: [String]
    },
    videoUrls: {
      type: [String]
    }
  }
);

module.exports = songSchema;