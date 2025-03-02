const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }

}, {timestamps: true})

userSchema.pre('save', function (next) {
    this.email = this.email.toLowerCase();
    this.username = this.username.toLowerCase();
    next();
  });
  
  // hash password before saving
  userSchema.pre("save", async function (next) {
    try {
      if (!this.isModified("password")) return next(); // Only hash if password is modified
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      next(error);
    }
  });

module.exports = mongoose.model('User', userSchema);