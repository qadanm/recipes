var mongoose = require('mongoose');


var commentSchema = new mongoose.Schema({
  user : String,
  content  : String,
});

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
    comments: [commentSchema],
  }, {
    timestamps: true
});

module.exports = mongoose.model('Recipe', recipeSchema); 