var express = require('express');

var router = express.Router();

// Require controllers
var book_controller = require('../controllers/bookController');
var author_controller = require('../controllers/authorController');
var book_instance_controller = require('../controllers/bookInstanceController');
var genre_controller = require('../controllers/genreController');

/// Book Routes ///

// GET catalog home page
router.get('/', book_controller.index);

// create book form
router.get('/book/create', book_controller.book_create_get);

// create a book
router.post('/book/create', book_controller.book_create_post);

// Delete a book form
router.get('/book/:id/delete', book_controller.book_delete_get);

// Delete a book post
router.post('/book/:id/delete', book_controller.book_delete_post);

// Read a book details
router.get('/book/:id', book_controller.book_detail);

// Get a book listing
router.get('/books', book_controller.book_list);

// Get a update book form
router.get('/book/:id/update', book_controller.book_update_get);

// update a book details
router.get('/book/:id/update', book_controller.book_update_post);

/// Author Routes ///

// get the create author form
router.get('/author/create', author_controller.author_create_get);

// create author post call
router.post('/author/create', author_controller.author_create_post);

// get delete author form
router.get('/author/:id/delete',author_controller.author_delete_get);

// delete a author post call
router.post('/author/:id/delete', author_controller.author_delete_post);

// get author update form
router.get('/author/:id/update', author_controller.author_update_get);

// update author details
router.post('/author/:id/update', author_controller.author_update_post);

// get author list
router.get('/authors', author_controller.author_list);

// get author details
router.get('/author/:id', author_controller.author_detail);

/// Book Instance Routes ///

// book instance create form
router.get('/bookinstance/create', book_instance_controller.bookinstance_create_get);

// book instance create post
router.post('/bookinstance/create', book_instance_controller.bookinstance_create_post);

// book instance update form
router.get('/bookinstance/:id/update', book_instance_controller.bookinstance_update_get);

// book instance update post call
router.post('/bookinstance/:id/update', book_instance_controller.bookinstance_update_get);

// book instance delete form
router.get('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_get);

// book isntance delete post call
router.post('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_post);

// book instance lising
router.get('/bookinstances', book_instance_controller.bookinstance_list);

// book instance details
router.get('/bookinstance/:id', book_instance_controller.bookinstance_detail);

/// Genre Routes ///

// genre create get form
router.get('/genre/create', genre_controller.genre_create_get);

// genre create post call
router.post('/genre/create', genre_controller.genre_create_post);

// genre update form get
router.get('/genre/:id/update', genre_controller.genre_update_get);

// genre update form post
router.post('/genre/:id/update', genre_controller.genre_update_post);

// gernre delete form get
router.get('/genre/:id/delete', genre_controller.genre_delete_get);

// genre delete form post
router.post('/genre/:id/delete', genre_controller.genre_delete_post);

// get genre listing
router.get('/genres', genre_controller.genre_list);

// genre details get
router.get('/genre/:id', genre_controller.genre_detail);


module.exports = router;

