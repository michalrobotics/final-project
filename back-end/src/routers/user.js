const express = require('express');
const router = new express.Router();
const User = require('../models/user');
const auth = require('../middleware/auth');
const { StatusCodes } = require('http-status-codes');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken(process.env.JWT_SECRET);
        res.status(StatusCodes.CREATED).send({ user, token });
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).send({ error: e.message });
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken(process.env.JWT_SECRET);

        res.send({ user, token });
    } catch (e) {
        res.status(StatusCodes.BAD_REQUEST).send({ error: e.message });
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
        res.status(StatusCodes.BAD_REQUEST).send({ error: e.message });
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

        const token = await user.generateAuthToken(process.env.JWT_SECRET);
        res.send({ user, token });
    } catch (e) {
        res.status(StatusCodes.UNAUTHORIZED).send({ error: e.message });
    }
});

router.post('/users/recover', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).send({ error: 'No user with that email' });
        }

        const secret = process.env.JWT_SECRET + user.password;

        const token = await user.generateAuthToken(secret);

        const resetURL = `http://localhost:3000/reset-password?id=${user._id}&token=${token}`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            to: user.email,
            from: process.env.EMAIL,
            subject: 'בקשה לאתחול סיסמה',
            text: `הודעה זו נשלחה מכיוון שאת/ה או מישהו אחר ביקשו לאתחל את הסיסמה של חשבונך לאתר בקשות ב"ם.\n\n
            אנא לחצו על הלינק הבא או העתיקו אותו לשורת החיפוש על מנת להשלים את התהליך.\n\n
            ${resetURL}\n\n
            במידה ולא ביקשתם לשנות סיסמה, אנא התעלמו מהודעה הזו וסיסמתכם לא תשתנה`
        };

        await transporter.sendMail(mailOptions);

        res.send({ message: 'Password reset link sent' });
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: e.message });
    }
});

router.post('/users/resetPassword', async (req, res) => {
    const { id, token } = req.query;
    const { password } = req.body;
    try {
        const user = await User.findOne({ _id: id });
        
        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).send({ error: 'User does not exist' });
        }

        const secret = process.env.JWT_SECRET + user.password;
        const verify = jwt.verify(token, secret);

        user.password = password;

        await user.save();

        const newToken = await user.generateAuthToken(process.env.JWT_SECRET);

        res.send({ user, token: newToken });
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: e.message });
    }
});

module.exports = router;
