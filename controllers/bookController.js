var Book = require('../models/book');
var Author = require('../models/author');
var BookInstances = require('../models/bookinstance');
var Genre = require('../models/genre');

var async = require('async');

// index page
exports.index = function(req, res){
    async.parallel({
        book_count: function(callback){
            Book.countDocuments({}, callback);
        },
        author_count: function(callback){
            Author.countDocuments({}, callback);
        },
        book_instance_count: function(callback){
            BookInstances.countDocuments({}, callback);
        },
        book_instance_available_count: function(callback){
            BookInstances.countDocuments({status: 'Available'}, callback);
        },
        genre_count: function(callback){
            Genre.countDocuments({}, callback);
        }
    }, function(err, result){
        res.render('index', {title: 'Local Library Home', error: err, data: result});
    });
};

// book lists
exports.book_list = function(req, res, next){
    Book.find({}, 'title author').populate('author').exec(function(err, list_books){
        if(err){
            return next(err);
        }
        res.render('book_list', {title: 'Book List', book_list : list_books});
    });
};

// book details
exports.book_detail = function(req, res, next){
    async.parallel({
        book: function(callback){
            Book.findById(req.params.id).populate('genre').populate('author').exec(callback);
        },
        book_instance: function(callback){
            BookInstances.find({'book':req.params.id}).exec(callback);
        }
    }, function(err, result){
        if(err){
            return next(err);
        }
        if(result.book === null){
            var err = new Error('book not fount');
            err.status = 404;
            return next(err);
        }
        res.render('book_detail', {book:result.book, book_instance:result.book_instance});
    });
};

// create book form
exports.book_create_get = function(req, res){
    res.send('Book create get');
};

// create book on post
exports.book_create_post = function(req, res){
    res.send('Book create post');
};

// delete book form
exports.book_delete_get = function(req, res){
    res.send('Book delete get');
};

// delete book post
exports.book_delete_post = function(req, res){
    res.send('Book delete post');
};

// delete book form
exports.book_update_get = function(req, res){
    res.send('Book update get');
};

// delete book post
exports.book_update_post = function(req, res){
    res.send('Book update post');
};