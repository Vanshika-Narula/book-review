const express = require('express');
const {addBook, getBooks, getBookById, searchBooks} = require('../controllers/bookController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Authenticated
router.post('/books', auth, addBook);

// Public
router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.get('/search', searchBooks);

module.exports = router;