var BookInstance = require('../models/bookinstance');

// display list of bookinstances
exports.bookinstance_list = function(req, res, next){
    BookInstance.find().populate('book').exec(function(err, list_bookinstances){
        if(err){
            return next(err);
        }
        res.render('bookinstance_list', {title: 'Book Instance listing', bookinstance_list: list_bookinstances});
    });
};

// display detail page for any specific instance
exports.bookinstance_detail = function(req, res, next){
    BookInstance.findById(req.params.id).populate('book').exec(function(err, bookInstance){
        if(err){
            return next(err);
        }
        if(bookInstance === null){
            var err = new Error('No book instance found');
            err.stack = 404;
            return next(err);
        }
        res.render('book_instance_detail',{bookInstance:bookInstance});
    });
    
};

// display bookinstance create form on get
exports.bookinstance_create_get = function(req, res){
    res.send('bookinstance create get');
};

// bookinstance create on post
exports.bookinstance_create_post = function(req, res){
    res.send('bookinstance create post');
};

// display bookinstance delete form on get
exports.bookinstance_delete_get = function(req, res){
    res.send('bookinstance delete get');
};

// delete bookinstance on post
exports.bookinstance_delete_post = function(req, res){
    res.send('bookinstance delete post');
};

// Display bookinstance update form on get
exports.bookinstance_update_get = function(req, res){
    res.send('bookinstance update get');
};

// update bookinstance on post
exports.bookinstance_update_post = function(req, res){
    res.send('bookinstance update post');
};