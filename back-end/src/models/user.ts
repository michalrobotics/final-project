import { NextFunction } from "express";

const mongoose = require('../db/mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    idfNum: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value: string) {
            if (!value.includes('@')) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6
    },
    isManager: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.generateAuthToken = async function (secret: string) {
    const user = this;

    const token = jwt.sign({ _id: user._id.toString() }, secret, { expiresIn: '3h' });

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    
    delete userObject.password;
    delete userObject.securityQuestion;
    delete userObject.tokens;

    return userObject;
}

userSchema.methods.getAllowedUpdates = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.isManager;
    delete userObject.tokens;
    delete userObject.idfNum;

    const allowedUpdates = Object.keys(userObject);
    return allowedUpdates;
}

userSchema.statics.findByCredentials = async (email: string, password: string) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to log in');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to log in');
    }

    return user;
}

userSchema.pre('save', async function (this: typeof User, next: NextFunction) {
    const user = this;

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
