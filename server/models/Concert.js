// All events come under the Concert model, because calling them 'events' in JavaScript seemed like a bad idea

const { Schema, model } = require("mongoose");

const songSchema = require("./Song");

const concertSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    date: {
      type: [String],
      required: true
    },
    time: {
      type: [String],
      required: true
    },
    venue: {
      type: [String],
      required: true
    },
    addlMaterials: {
      type: [String]
    },
    songs: [songSchema]
  }
);

const Concert = model("Concert", concertSchema);

module.exports = Concert;