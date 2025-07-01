const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        state: {
            type: String,
            enum: ['open', 'approved', 'rejected'],
            default: 'open',
            trim: true
        },
        description: {
            type: String,
            trim: true
        }
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

const BMRequest = mongoose.model('Request', requestSchema);

module.exports = BMRequest;
