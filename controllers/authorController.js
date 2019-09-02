const Author = require('../models/author');
const Book = require('../models/book');
const async = require('async');
const {
    body,
    validationResult,
} = require('express-validator/check');
const {
    sanitizeBody,
} = require('express-validator/filter');

// display author list
exports.author_list = function(req, res, next){
    Author.find().sort([['family_name', 'ascending']]).exec(function(err, list_authors){
        if(err){
            return next(err);
        }
        res.render('author_list', {title:'Author List', author_list:list_authors});
    });
};

// display author details
exports.author_detail = function(req, res, next){
    async.parallel({
        author: function(callback){
            Author.findById(req.params.id).exec(callback)
        },
        books: function(callback){
            Book.find({'author':req.params.id}).exec(callback);
        }
    }, function(er, result){
        if(err){
            return next(err);
        }
        if(result.author === null){
            var err = new Error('author does not found');
            err.stack = 404;
            return next(err);
        }
        res.render('author_detail',{author:result.author, books:result.books});
    });
};

// display author create form on GET
exports.author_create_get = function(req, res){
    res.render('author_create', {title:'Create Author'});
};

// handle author create on post
exports.author_create_post = [
    // validation of fields
    body('first_name').isLength({min:1}).trim().withMessage('First name must be specified').isAlphanumeric().withMessage('First name has non-aplhanumeric characters'),
    body('last_name').isLength({min:1}).trim().withMessage('Family name must be specified').isAlphanumeric().withMessage('Last name has non-aplhanumeric characters'),
    body('date_of_birth', 'Invalid date of birth').optional({ checkFalsy: true }).isISO8601(),
    body('date_of_death', 'Invalid date of death').optional({ checkFalsy: true }).isISO8601(),
    
    // sanitize data for db
    sanitizeBody('first_name').escape(),
    sanitizeBody('last_name').escape(),
    sanitizeBody('date_of_birth').toDate(),
    sanitizeBody('date_of_death').toDate(),

    (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.render('author_create', {title:'Create Author', errors:errors.array()});
        }else{
            const author = new Author({
                first_name: req.body.first_name,
                family_name: req.body.last_name,
                date_of_birth: req.body.date_of_birth,
                date_of_death: req.body.date_of_death
            });
            author.save((err)=>{
                if(err){
                    return next(err);
                }
                res.redirect(author.url);
            });
        }
    }
]

// Display author delete form on get
exports.author_delete_get = function(req, res){
    res.send('author delete get');
};

// handle author delete on post
exports.author_delete_post = function(req, res){
    res.send('author delete post');
};

// display author update form on get
exports.author_update_get = function(req, res){
    res.send('author update get');
};

// update author on post
exports.author_update_post = function(){
    res.send('author update post');
};