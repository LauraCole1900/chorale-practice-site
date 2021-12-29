const { Schema, model } = require("mongoose");

const Song = require("./Song");

const eventSchema = new Schema(
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
    songs: [Song]
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;