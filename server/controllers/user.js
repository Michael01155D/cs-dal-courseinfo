const userRouter = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//create new user
userRouter.post('/', async (req, res) => {
    const salt = bcrypt.genSalt(10);
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

userRouter.post('/login', async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    const isValid = !user ? false : await bcrypt.compare(req.body.password, user.passwordHash);
    if (!isValid) {
        return res.status(401).json({error: "invalid username or password"});
    }
    //todo add token or http cookie and give to logged in user
})

userRouter.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
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