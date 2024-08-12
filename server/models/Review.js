const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    content: {
        type: String,
        required: true,
        maxLength: 750 //??? 
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    proffesor: String,
    yearTaken: Number,
    quality: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    difficulty: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    courseLoad: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    upvotes: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model("Review", reviewSchema);