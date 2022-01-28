const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    postType: {
      type: String,
      required: true
    },
    postSection: {
      type: String
    }
    postExpire: {
      type: Date
    },
    postDate: {
      type: Date,
      default: Date.now
    },
    postTitle: {
      type: String
    },
    postBody: {
      type: String,
      default: "There are no new announcements at this time."
    }
  }
);

const Post = model("Post", postSchema);

module.exports = Post;