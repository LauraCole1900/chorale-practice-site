const { Schema, model } = require("mongoose");

const Song = require("./Song");

const concertSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    songs: [Song]
  }
);

const Concert = model("Concert", concertSchema);

module.exports = Concert;