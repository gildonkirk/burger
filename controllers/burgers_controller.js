var express = require('express');
var router = express.Router();

var burgers = require('../models/burger.js');

router.get('/', function(req, res) {
  burgers.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render('index', hbsObject);
  });
});

router.post('/', function(req, res) {
  burgers.create([
    'burger_name', 'devoured'
  ], [
    req.body.burger_name, false
  ], function(data) {
    res.redirect('/');
  });
});

router.put('/:id', function(req, res) {
  var condition = 'id = ' + req.params.id;

  console.log('condition', condition);

  burgers.update({
    devoured: req.body.devoured
  }, condition, function(data) {
    res.json(data);
  });
});

module.exports = router;
