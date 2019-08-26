var express = require('express');
var router = express.Router();
var recipesCtrl = require('../controllers/recipes');

// router.get('/recipes', recipesCtrl.index);

/* GET users listing. */
router.get('/', recipesCtrl.index)
router.get('/submit', function(req, res) {
  res.render('recipes/submit');
});

module.exports = router;
