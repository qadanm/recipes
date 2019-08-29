const Recipe = require('../models/user-profile');
const User = require('../models/user');

module.exports = {
    index,
    create,
    addRecipe,
    show,
    addComment,
    deleteRecipe,
    editForm,
    editRecipe
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
    console.log(req.user);
    res.render('recipes/submit', {
        user: req.user,
        name: req.query.name,
    });
}

function addRecipe(req, res) {
    var recipe = new Recipe(req.body);
    recipe.save(function (err) {
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
    })
    })}

function deleteRecipe(req, res, next) {
    Recipe.findByIdAndDelete(req.params.id, function(err) {
          res.redirect('/');
        });
}
// function deleteRecipe(req, res, next) {
//     Recipe.findOne({'recipes._id': req.params.id}, function(err, recipe) {
//         recipe.id(req.params.id).remove();
//         recipe.save(function(err) {
//           res.redirect('/recipes');
//         });
//       });
// }

function editForm(req, res, next){
    console.log('this is editForm');
    // console.log(req.user);
    Recipe.findById(req.params.id, function(err, recipe){
        res.render('recipes/edit', {
            recipe,
            title: 'Recipe',
            user: req.user,
            // name: user.name,
            total: null
        });
    })
}

function editRecipe(req, res, next){
    // console.log(req);
    console.log(req.params.id)
    Recipe.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (err, recipe) => {
            if (err) return res.redirect('back');
            return res.redirect(`/recipes`);
        }
    )
    // Recipe.findById(req.params.id, function(e, recipe){
    //     console.log(recipe)
    //     console.log(req.body)
    // })
}