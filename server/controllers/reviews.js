const Course = require('../models/Course');
const Review = require('../models/Review');
const User = require('../models/User');
const reviewRouter = require('express').Router();

reviewRouter.get('/', async (req, res) => {
    const reviews = await Review.find({})
        .populate("course", {courseCode: 1, courseDescription: 1})
        .populate("author", {username: 1});
    return res.status(200).json(reviews);
})

reviewRouter.get('/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate("course").populate("author");
        if (review) {
            res.status(200).json(review);
        } else {
            res.status(404).end();
        }
    } catch (exception) {
        res.status(500).json(exception);
    }
})


reviewRouter.post('/', async (req, res) => {
    console.log("in review POST route, req body is: ", req.body)
    try {
        const courseReviewed = await Course.findById(req.body.course._id);
        const newReview = new Review({...req.body, course: courseReviewed._id});
        const savedReview = await newReview.save();
        courseReviewed.reviews = courseReviewed.reviews.concat(savedReview);
        await courseReviewed.save();
        const reviewAuthor = await User.findById(savedReview.author);
        reviewAuthor.reviewsWritten = reviewAuthor.reviewsWritten.concat(savedReview);
        await reviewAuthor.save();
        res.status(201).json(savedReview);
    } catch (exception) {
        console.log("reached exception?");
        console.log('exception is: ', exception);
        res.status(500).json(exception);
    }
})


//update review
reviewRouter.put('/:id', async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json(updatedReview);
    } catch (exception) {
        res.status(500).json(exception);
    }
})


reviewRouter.delete('/:id', async (req, res) => {
    try {
        //first, delete the review reference from Course and User.
        const courseReviewed = await Course.findOne({reviews: req.params.id});
        console.log('courseReviewed is: ', courseReviewed);
        courseReviewed.reviews = courseReviewed.reviews.filter(r => r.toString() !== req.params.id);
        console.log('after filter courseReviewed is', courseReviewed);
        await courseReviewed.save();
        const reviewAuthor = await User.findOne({reviewsWritten: req.params.id});
        reviewAuthor.reviewsWritten = reviewAuthor.reviewsWritten.filter(r => r.toString() !== req.params.id);
        await reviewAuthor.save();
        await Review.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (exception) {
        console.log('exception is:', exception);
        res.status(500).json(exception);
    }
})


module.exports = reviewRouter;

