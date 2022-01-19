const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    preferredName: {
      type: String,
      required: true
    },
    birthday: {
      type: String
    },
    email1: {
      type: String,
      required: true,
      unique: true
    },
    email2: {
      type: String
    },
    password: {
      type: String,
      required: true
    },
    phone1: {
      type: String
    },
    phone1Type: {
      type: String
    },
    phone2: {
      type: String
    },
    phone2Type: {
      type: String
    },
    phone3: {
      type: String
    },
    phone3Type: {
      type: String
    },
    section: {
      type: String,
      required: true
    },
    position: {
      type: String,
      default: "singer"
    },
    streetAddress: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zipCode: {
      type: String
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    }
  }
);

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;