var express = require('express');
var router = express.Router();
var recipesCtrl = require('../controllers/recipes');

// router.get('/recipes', recipesCtrl.index);

/* GET users listing. */
router.get('/recipes', recipesCtrl.index)
router.post('/recipes', recipesCtrl.addRecipe)
router.get('/submit', recipesCtrl.create)
router.get('/recipes/:id', recipesCtrl.show);
router.post('/recipes/:id', recipesCtrl.addComment);
router.delete('/recipes/:id', recipesCtrl.deleteRecipe);
router.get('/edit/:id', recipesCtrl.editForm)
router.post('/recipes/:id/edit', recipesCtrl.editRecipe);




function isLoggedIn(req, res, next) {
    if ( req.isAuthenticated() ) return next();
    res.redirect('/auth/google');
  }

module.exports = router;
