import type { Response } from "express";
import type { AuthRequest } from "../types/express";

const express = require('express');
const router = new express.Router();
const BMRequest = require('../models/request');
const auth = require('../middleware/auth');
const { StatusCodes } = require('http-status-codes');

router.post('/requests', auth, async (req: AuthRequest, res: Response) => {
    const request = new BMRequest({
        ...req.body,
        creator: req.user._id
    });

    try {
        await request.save();
        res.status(StatusCodes.CREATED).send(request);
    } catch (e: any) {
        res.status(StatusCodes.BAD_REQUEST).send({ error: e.message });
    }
});

router.patch('/requests/:id', auth, async (req: AuthRequest, res: Response) => {
    if (!req.user.isManager) {
        res.status(StatusCodes.UNAUTHORIZED).send({ error: 'Only managers can change a request status' });
    }

    const updates = Object.keys(req.body);
    const allowedUpdates = ['state', 'description'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(StatusCodes.BAD_REQUEST).send({ error: 'Invalid updates!' });
    }

    try {
        const request = await BMRequest.findById(req.params.id);

        if (!request) {
            res.status(StatusCodes.NOT_FOUND).send();
        }

        req.body.state = req.body.state.toLowerCase();
        request.status = req.body;

        await request.save();
        res.send(request);
    } catch (e: any) {
        res.status(StatusCodes.BAD_REQUEST).send({ error: e.message });
    }
});

router.get('/requests', auth, async (req: AuthRequest, res: Response) => {
    const match: {
        creator?: string;
        title?: string;
        'status.state'?: {
            $in: string[]
        };
        createdAt?: {
            $gte?: Date
            $lte?: Date
        };
    } = {};

    if (!req.user.isManager) {
        match.creator = req.user._id;
    } else if (req.query.creator && typeof req.query.creator === 'string') {
        match.creator = req.query.creator;
    }

    if (req.query.state && typeof req.query.state === 'string') {
        const states = req.query.state.split(',');
        match['status.state'] = { $in: states };
    }

    if (req.query.title && typeof req.query.title === 'string') {
        match.title = req.query.title;
    }

    if (req.query.from || req.query.until) {
        match.createdAt = {};
        if (req.query.from && typeof req.query.from === 'string') {
            match.createdAt['$gte'] = new Date(new Date(req.query.from).setHours(0, 0, 0));
        }
        if (req.query.until && typeof req.query.until === 'string') {
            match.createdAt['$lte'] = new Date(new Date(req.query.until).setHours(23, 59, 59));
        }
    }

    const limit = typeof req.query.limit === 'string' ? parseInt(req.query.limit) : undefined;
    const skip = typeof req.query.skip === 'string' ? parseInt(req.query.skip) : undefined;

    try {
        const requests = await BMRequest.find(
            match,
            null,
            {
                limit,
                skip
            }
        );

        for (const request of requests) {
            await request.populate('creator');
        }

        res.send(requests);
    } catch (e: any) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: e.message });
    }
});

module.exports = router;
