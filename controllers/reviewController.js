const { removeListener } = require('process');
const Review = require('../models/Review');

exports.addReview = async (req, res) => {
    try{
        const {rating, comment} = req.body;
        const bookId = req.params.id;
        const userId = req.user.userId;

        const alreadyReviewed = await Review.findOne({user: userId, book: bookId});
        if(alreadyReviewed)
            return res.status(400).json({message: "Review already added"});

        const review = new Review({user: userId, book: bookId, rating, comment});
        await review.save();

        res.status(201).json({message: "Review added", review});
    }

    catch(err){
        res.status(500).json({message: err.message});
    }
}


exports.updateReview = async (req, res) => {
    try{

        const review = await Review.findById(req.params.id);

        if(!review || review.user.toString()!==req.user.userId)
            return res.status(403).json({message: "Unauthorized or review not found"});

        const {rating, comment} = req.body;
        if(rating) review.rating=rating;
        if(comment) review.comment = comment;

        await review.save();
        res.json({message: "Review updated", review});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}


exports.deleteReview = async(req, res)=>{
    try{
        const review = await Review.findById(req.params.id);

        if(!review || review.user.toString()!==req.user.userId)
            return res.status(403).json({message: "Unauthorized or review not found"});

        await review.remove();
        res.json({message: "Review deleted"});
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}