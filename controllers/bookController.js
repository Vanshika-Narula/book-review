const Book = require('../models/Book');
const Review = require('../models/Review');

exports.addBook = async (req, res) => {
    try{
        const {title, author, genre, description} = req.body;
        const book = new Book({title, author, genre, description});
        await book.save();
        res.status(201).json({message: "Book added successfully", book});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

exports.getBooks = async (req, res) => {
    try{
        const{author, genre, page=1, limit=10} = req.query;
        const query={};

        if(author) 
            query.author = new RegExp(author, 'i');
        if(genre)
            query.genre = new RegExp(genre, 'i');

        const books = await Book.find(query)
            .skip((page-1)*limit)
            .limit(parseInt(limit));

        res.json(books);
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
};


exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        const reviews = await Review.find({book: req.params.id}).populate('user', 'name');
        const averageRating = reviews.reduce((sum, review) => sum+review.rating,0)/ (reviews.length || 1);

        res.json({book, averageRating: averageRating.toFixed(1), reviews});
    } catch (err) {
       res.status(500).json({message: err.message}); 
    }
}

exports.searchBooks = async (req, res) => {
    try {
        const { query, title, author } = req.query;
        const searchQuery = {};

        if (query && typeof query === 'string') {
            searchQuery.$or = [
                { title: { $regex: query, $options: 'i' } },
                { author: { $regex: query, $options: 'i' } }
            ];
        }

        if (title && typeof title === 'string') {
            searchQuery.title = { $regex: title, $options: 'i' };
        }

        if (author && typeof author === 'string') {
            searchQuery.author = { $regex: author, $options: 'i' };
        }

        const books = await Book.find(searchQuery);
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
