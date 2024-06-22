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
        required: true
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    certificateRequirement: {
        type: Boolean,
        required: true
    },
    certificateElective: {
        type: Boolean,
        required: true
    },
    coopRequirement: {
        type: Boolean,
        required: true
    },
    scienceWithLabElective: {
        type: Boolean
    },
    beseElective: {
        type: Boolean
    }
})

module.exports = mongoose.model("Course", courseSchema);