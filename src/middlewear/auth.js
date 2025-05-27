const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const decoded = jwt.verify(token, 'bamVerySecret');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).send({ error: 'Please authenticate' });
    }
}

module.exports = auth;
