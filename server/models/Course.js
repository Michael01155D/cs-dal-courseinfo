const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    
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
    year: {
        type: Number,
        required: true
    },
    prerequisites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    bcsRequirement: {
        type: Boolean,
        required: true,
        default: false
    },
    bacsRequirement: {
        type: Boolean,
        required: true,
        default: false
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }],
    coopRequirement: {
        type: Boolean,
        required: true,
        default: false
    }

})

module.exports = mongoose.model("Course", courseSchema);