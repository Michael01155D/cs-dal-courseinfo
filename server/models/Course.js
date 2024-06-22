const mongoose = require('mongoose');
const { Schema } = mongoose;
const Review = require('./Review');

const courseSchema = new Schema({
    //todo: look into REGEX to ensure CSCI #### is followed as match validator option
    courseCode: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 9
    },
    courseDescription: {
        type: String,
        required: true
    },
    degreeRequirement: {
        type: Boolean,
        required: true,
        default: false
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    avgQuality: Number,
    avgDifficulty: Number,
    avgCourseLoad: Number,
    certificateRequirement: {
        type: Boolean,
        required: true,
        default: false
    },
    certificateElective: {
        type: Boolean,
        required: true,
        default: false
    },
    coopRequirement: {
        type: Boolean,
        required: true,
        default: false
    },
    scienceWithLabElective: {
        type: Boolean,
        default: false
    },
    beseElective: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Course", courseSchema);