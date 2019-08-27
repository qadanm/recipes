const Recipe = require('../models/user-profile')

module.exports = {
    index,
    create,
    addRecipe,
    show
    // deleteRecipe
}

function index(req, res) {
    Recipe.find({}, function (err, recipes) {
        res.render('recipes/index', {
            title: 'All Recipes',
            recipes,
            user: req.user,
            name: req.query.name,
        });
    });
}

// ----- >  form
function create(req, res, err) {
    res.render('recipes/submit', {
        user: req.user,
        name: req.query.name,
    });
}

function addRecipe(req, res) {
    var recipe = new Recipe(req.body);
    recipe.save(function (err) {
        console.log(req.body)
        console.log(recipe)
        res.redirect('/')
    })
}

function show(req, res) {
    Recipe.findById(req.params.id, function (e, recipe) {
        res.render('recipes/recipe', {
            title: 'Recipe',
            recipe: recipe,
            user: req.user,
            name: req.query.name,
        });
    })
}

function deleteRecipe(req, res, next) {

}