const Recipe = require('../models/user-profile')

module.exports = {
    index,
    create
    // addRecipe,
    // deleteRecipe
}

function index(req, res) {
    Recipe.find({}, function(err, recipes) {
      res.render('recipes/index', {
         title: 'All Recipes', 
         recipes,
         user: req.user,
         name: req.query.name,
        });
    });
  }

  function create(req, res) {
    var recipe = new Recipe(req.body);
    recipe.save(function(err) {
      if (err) return res.redirect('/recipes/new');

      res.redirect(`/recipes`);
    });
  }

// function addRecipes(req, res, next){

// }

function deleteRecipe(req, res, next) {

}
