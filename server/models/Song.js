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
    practiceTrackUrlsSop: {
      type: [String]
    },
    practiceTrackTitlesSop: {
      type: [String]
    },
    practiceTrackUrlsAlto: {
      type: [String]
    },
    practiceTrackTitlesAlto: {
      type: [String]
    },
    practiceTrackUrlsTen: {
      type: [String]
    },
    practiceTrackTitlesTen: {
      type: [String]
    },
    practiceTrackUrlsBass: {
      type: [String]
    },
    practiceTrackTitlesBass: {
      type: [String]
    },
    videoUrls: {
      type: [String]
    }
  }
);

module.exports = songSchema;