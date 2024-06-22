const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    content: {
        type: String,
        required: true,
        maxLength: 500 //??? 
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
    created: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model("Review", reviewSchema);