const userRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const token = require('jsonwebtoken');
require('dotenv').config();

userRouter.get('/', async (req, res) => {
    const users = await User.find({})
    .populate({
        path: 'reviewsWritten',
        select: 'content course quality difficulty courseLoad createdAt',
        populate: {
            path: 'course',
            select: 'courseCode courseDescription'
        }
    });
    res.json(users);
})

//create new user
userRouter.post('/', async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    const pw = req.body.password;
    if (!pw || pw.trim().length < 8) {
        return res.status(400).send({error: "Password must be at least 8 characters"});
    }
    const pwHash = await bcrypt.hash(pw, salt);
    const newUser = new User({username: req.body.username, passwordHash: pwHash});
    try {
        const savedUser = await newUser.save();
        res.json(savedUser);
    } catch (e) {
        res.json(e);
    }

})

//login route
userRouter.post('/login', async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    const isValid = !user ? false : await bcrypt.compare(req.body.password, user.passwordHash);
    if (!isValid) {
        return res.status(401).json({error: "invalid username or password"});
    }
    const authToken = token.sign(user.toJSON(), process.env.SECRET);
    const salt = await bcrypt.genSalt(10);
    user.session = await bcrypt.hash(authToken, salt);
    res.status(200).send(user);
})

//when logging out, update user after removing session variable
userRouter.put('/logout/:id', async (req, res) => {
    //TODO: be sure to test this using api-test
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {...req.body.user, session: null}, {new: true});
        res.json(user);
    } catch (e) {
        res.json(e);
    }
})

//for changing userName or updating profile info
userRouter.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(user);
    } catch (e) {
        res.json(e);
    }
})

userRouter.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate({
            path: 'reviewsWritten',
            select: 'content course quality difficulty courseLoad createdAt',
            populate: {
                path: 'course',
                select: 'courseCode courseDescription'
            }
        });
        res.json(user);
    } catch (e) {
        res.json(e);
    }
    //todo: add middleware fn that ensures user has valid token or cookie before handling req
});

userRouter.delete('/:id', async (req, res) => {
    //todo: add check to see if user sending this request has same id as param or is admin
    await User.findByIdAndDelete(req.params.id);
})

module.exports = userRouter;