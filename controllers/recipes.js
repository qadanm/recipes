const Recipe = require('../models/user-profile')

module.exports = {
    index,
    create,
    addRecipe,
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

  function addRecipe(req,res){
    var recipe = new Recipe(req.body);
    recipe.save(function(err){
      console.log(req.body)
      console.log(recipe)
    })
  }

  function create(req, res, err){
      // if (err) return res.redirect('recipes/index');
      res.render('recipes/submit',{
        user: req.user,
        name: req.query.name,
      });
  }

// function addRecipes(req, res, next){

// }

function deleteRecipe(req, res, next) {

}
