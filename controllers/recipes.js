const Recipe = require('../models/user-profile');
const User = require('../models/user');

module.exports = {
    index,
    create,
    addRecipe,
    show,
    addComment,
    deleteRecipe
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
            total: null
        });
    })
}

function addComment(req, res) {
    console.log(req.params.id)
    // var comment = new Recipe.comments(req.body);
    Recipe.findById(req.params.id, function (e, recipe) {
    recipe.comments.push(req.body)
    recipe.save(function (err) {
        res.render('recipes/recipe', {
            title: 'Recipe',
            recipe: recipe,
            user: req.user,
            name: req.query.name,
            total: null
        })
        console.log(req.body, '<<<<<<req.body<<<<')
    })
    })}

function deleteRecipe(req, res, next) {
    Recipe.findOne({'recipes._id': req.params.id}, function(err, recipe) {
        recipe.facts.id(req.params.id).remove();
        recipe.save(function(err) {
          res.redirect('/recipes');
        });
      });
}