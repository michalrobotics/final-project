const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middlewear/auth');
const { StatusCodes } = require('http-status-codes');

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(StatusCodes.CREATED).send({ user, token });
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).send(e.message);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.send({ user, token });
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).send(e.message);
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
    }
});

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = req.user.getAllowedUpdates();
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Invalid updates!' });
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).send(e.message);
    }
});

router.get('/users/forgot', async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
            'securityQuestion.question': req.body.question,
            'securityQuestion.answer': req.body.answer
        });

        if (!user) {
            throw new Error('Unauthorized');
        }

        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (e) {
        res.status(StatusCodes.UNAUTHORIZED).send(e.message);
    }
});

module.exports = router;
