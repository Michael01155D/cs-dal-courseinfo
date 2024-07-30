const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 2
    },
    passwordHash: {
        type: String,
        required: true
    },
    reviewsWritten: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Review",
        default: []
    },
    profileInfo: {
        type: [],
        default: []
    },
    //for hash of auth token
    session: String
})

module.exports = mongoose.model("User", userSchema);