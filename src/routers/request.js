const express = require('express');
const router = new express.Router();
const Request = require('../models/request');
const auth = require('../middlewear/auth');
const { StatusCodes } = require('http-status-codes');

router.post('/requests', auth, async (req, res) => {
    const request = new Request({
        ...req.body,
        creator: req.user._id
    });

    try {
        await request.save();
        res.status(StatusCodes.CREATED).send(request);
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).send(e.message);
    }
});

module.exports = router;
