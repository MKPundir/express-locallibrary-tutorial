var express = require('express');

var router = express.Router();

// Home page route
router.get('/',function(req, res){
    res.send('wiki home page');
});

// About page route
router.get('/about',function(req,res,next){
    console.log('heheehhehehe!!!!');
    next();
},function(req, res){
    res.send('About this wiki');
});

module.exports = router;
