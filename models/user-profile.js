var mongoose = require('mongoose');

var recipeSchema = new mongoose.Schema({
    title:{
        type: String
    },
    ingredients:{
        type: String
    },
    description:{
        type: String
    },
  }, {
    timestamps: true
  });

var userProfileSchema = new mongoose.Schema({
  name: String,
  email: String,
  recipes: [recipeSchema],
  googleId: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', userProfileSchema);