// This is a subdocument schema. Songs belong to their Concerts and exist as an array in the Concert document

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
    practiceTrackTitlesSopSlow: {
      type: [String]
    },
    practiceTrackUrlsAltoSlow: {
      type: [String]
    },
    practiceTrackTitlesAltoSlow: {
      type: [String]
    },
    practiceTrackUrlsTenSlow: {
      type: [String]
    },
    practiceTrackTitlesTenSlow: {
      type: [String]
    },
    practiceTrackUrlsBassSlow: {
      type: [String]
    },
    practiceTrackTitlesBassSlow: {
      type: [String]
    },
    practiceTrackUrlsSopATempo: {
      type: [String]
    },
    practiceTrackTitlesSopATempo: {
      type: [String]
    },
    practiceTrackUrlsAltoATempo: {
      type: [String]
    },
    practiceTrackTitlesAltoATempo: {
      type: [String]
    },
    practiceTrackUrlsTenATempo: {
      type: [String]
    },
    practiceTrackTitlesTenATempo: {
      type: [String]
    },
    practiceTrackUrlsBassATempo: {
      type: [String]
    },
    practiceTrackTitlesBassATempo: {
      type: [String]
    },
    videoUrls: {
      type: [String]
    }
  }
);

module.exports = songSchema;