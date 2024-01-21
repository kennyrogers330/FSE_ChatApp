const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the user"],
    trim: true,
  },

  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
    trim: true,
  },

  email: {
    type: String,
    required: [true, "Please provide an email for the user"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Invalid email"],
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
    select: false,
  },

  confirm_password: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match",
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  /**
   *  The 12 is the cost factor, which determines the number of rounds used for the hashing.
   * Higher values increase the security but also the time it takes to hash the password.
   * A common value is between 10 and 12.
   */
  this.password = await bcrypt.hash(this.password, 12);

  //make the confirm_password transient
  this.confirm_password = undefined;
  next();
});

userSchema.methods.checkPasswords = async function (
  requestPassword,
  encPassword
) {
  return await bcrypt.compare(requestPassword, encPassword);
};

const ChatUser = mongoose.model("ChatUser", userSchema);

module.exports = ChatUser;
