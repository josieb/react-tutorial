const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  provider: String,
  provider_id: String,
  token: String,
  provider_pic: String,
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
});

UserSchema.methods.follow = function(_id) {
  if (this.following.indexOf(_id) === -1) {
    this.following.push(_id);
  }
  return this.save();
}

UserSchema.methods.addFollower = function(fs) {
   this.followers.push(fs);
}

module.exports = mongoose.model('User', UserSchema);