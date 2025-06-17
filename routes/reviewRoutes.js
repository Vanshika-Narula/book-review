const express = require('express');
const {addReview, updateReview, deleteReview} = require('../controllers/reviewController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();


router.post('/books/:id/reviews', auth, addReview);
router.post('/reviews/:id', updateReview);
router.delete('/reviews/:id', auth, deleteReview);

module.exports = router;