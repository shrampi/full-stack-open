const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  name: String,
  blogs: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }
  ]
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.password;
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;