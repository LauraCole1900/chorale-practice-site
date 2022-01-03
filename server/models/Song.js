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
    practiceTrackUrlsAlto: {
      type: [String]
    },
    practiceTrackUrlsTen: {
      type: [String]
    },
    practiceTrackUrlsBass: {
      type: [String]
    },
    videoUrls: {
      type: [String]
    }
  }
);

module.exports = songSchema;