var mongoose = require('mongoose');

const User = require('../models/user');

var commentSchema = new mongoose.Schema({
  user : String,
  content  : String,
});

var recipeSchema = new mongoose.Schema({
    title:{
      type: String,
      required: true
    },
    ingredients:{
      type: String,
      required: true
    },
    description:{
      type: String,
    },
    author: {
      type: String,
      required: true
    },

    comments: [commentSchema],
  }, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema); 