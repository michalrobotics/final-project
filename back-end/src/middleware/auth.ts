import type { NextFunction, Response } from "express";
import type { AuthRequest } from "../types/express";

const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');

const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        req.token = token!;
        req.user = user;
        next();
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).send({ error: 'Please authenticate' });
    }
}

module.exports = auth;
