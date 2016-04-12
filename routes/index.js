
var models  = require('../models');
var express = require('express');
var router  = express.Router();
console.log(models)
router.get('/', function(req, res) {
  models.User.findAll({
    include: [ models.Task ]
  }).then(function(users) {
    if(users){
        
        res.render('index', {
          title: 'Express',
          users: users
        });
    }
  });
});

module.exports = router;
