const courseRouter = require('express').Router();
const Course = require('../models/Course');
const Review = require('../models/Review');

//for dev purposes only. remove once actual data is being used
courseRouter.get('/nuke', async (req, res) => {
    await Course.deleteMany({});
    await Review.deleteMany({});
    res.send("courses and reviews go boom");
})


courseRouter.get('/', async (req, res) => {
    const courses = await Course.find({})
    .populate("reviews", {_id: 1, content: 1, quality: 1, difficulty: 1, courseLoad: 1, created: 1})
    .populate("prerequisites", {courseCode: 1, courseDescription: 1});
    res.status(200).json(courses);
})

courseRouter.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id)
        .populate("reviews", {_id: 1, content: 1, quality: 1, difficulty: 1, courseLoad: 1, created: 1})
        .populate("prerequisites", {courseCode: 1, courseDescription: 1});
        if (course) {
            res.status(200).json(course);
        } else {
            res.status(404).end();
        }
    } catch (exception) {
        res.status(500).json(exception);
    }
})

courseRouter.post('/', async (req, res) => {
    const newCourse = new Course(req.body);
    try {
        const savedCourse = await newCourse.save();
        res.status(201).json(savedCourse);
    } catch (exception) {
        res.status(500).json(exception);
    }
})

courseRouter.put('/:id', async (req, res) => {
    try {
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (updatedCourse) { 
            res.status(201).json(updatedCourse);
        } else {
            res.status(404).end();
    } } catch (exception) {
        res.status(500).json(exception);
    }
})

//todo: all reviews from deleted course are also deleted, and deleted from their author user as well
courseRouter.delete('/:id', async (req, res) => {
    try {
        const courseToDelete = await Course.findByIdAndDelete(req.params.id);
        if (courseToDelete.reviews.length > 0) {
            await Review.deleteMany({course: req.params.id});
        }
        const hadAsPrereq = await Course.find({prerequisites: req.params.id});
        if (hadAsPrereq) {
            hadAsPrereq.prerequisites.filter(course => course.id != req.params.id);
            await hadAsPrereq.save();
        }
        
        res.status(204).end();
    } catch (exception) {
        res.status(500).json(exception);
    }
})

module.exports = courseRouter;