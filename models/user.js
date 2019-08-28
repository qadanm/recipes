var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    recipes:{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Recipe'
  },
    googleId: String
  }, {
    timestamps: true
  });

  module.exports = mongoose.model('User', userSchema); 