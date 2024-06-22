const Course = require('../models/Course');
const Review = require('../models/Review');
const User = require('../models/User');
const reviewRouter = require('express').Router();
//todo: change populate("course") to populate("course").populate("user");
reviewRouter.get('/', async (req, res) => {
    const reviews = await Review.find({}).populate("course", {courseCode: 1, courseDescription: 1});
    return res.status(200).json(reviews);
})

reviewRouter.get('/:id', async (req, res) => {
    try {
        const review = await Review.findById(req.params.id).populate("course");
        if (review) {
            res.status(200).json(review);
        } else {
            res.status(404).end();
        }
    } catch (exception) {
        res.status(500).json(exception);
    }
})


//TODO: once users are implemented, add: reference to User, then set author: user._id before saving review, then update user's reviews
reviewRouter.post('/', async (req, res) => {

    try {
        const courseReviewed = await Course.findById(req.body.courseId);
        const newReview = new Review({...req.body, course: courseReviewed._id});
        const savedReview = await newReview.save();
        courseReviewed.reviews = courseReviewed.reviews.concat(savedReview);
        await courseReviewed.save();
        res.status(201).json(savedReview);
    } catch (exception) {
        res.status(500).json(exception);
    }
})

reviewRouter.put('/:id', async (req, res) => {
    try {
        const updatedReview = await Review.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (updatedReview) { 
            res.status(201).json(updatedReview);
        } else {
            res.status(404).end();
    } } catch (exception) {
        res.status(500).json(exception);
    }
})

//todo: delete the review from course's array as well
reviewRouter.delete('/:id', async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (exception) {
        res.status(500).json(exception);
    }
})


module.exports = reviewRouter;

