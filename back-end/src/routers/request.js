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

router.patch('/requests/:id', auth, async (req, res) => {
    if (!req.user.isManager) {
        res.status(StatusCodes.UNAUTHORIZED).send({ error: 'Only managers can change a request status' });
    }

    const updates = Object.keys(req.body);
    const allowedUpdates = ['status', 'description'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Invalid updates!' });
    }

    try {
        const request = await Request.findByIdAndUpdate(req.params.id, {});

        if (!request) {
            res.status(StatusCodes.NOT_FOUND).send();
        }

        req.body.status = req.body.status.toLowerCase();
        request.status = req.body;

        await request.save();
        res.send(request);
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).send(e.message);
    }
});

router.get('/requests', auth, async (req, res) => {
    const match = {};

    if (!req.user.isManager) {
        match.creator = req.user;
    }

    if (req.query.status) {
        match.status = {};
        match.status.status = req.query.status;
    }

    if (req.query.request) {
        match.request = req.query.request;
    }

    if (req.query.from || req.query.until) {
        match.createdAt = {};
        if (req.query.from) {
            match.createdAt['$gte'] = new Date(new Date(req.query.from).setHours(0, 0, 0));
        }
        if (req.query.until) {
            match.createdAt['$lte'] = new Date(new Date(req.query.until).setHours(23, 59, 59));
        }
    }

    try {
        const requests = await Request.find(
            match,
            null,
            {
                limit: 50,
                skip: parseInt(req.query.skip)
            }
        );

        res.send(requests);
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(e.message);
    }
});

module.exports = router;
