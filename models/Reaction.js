const {Schema, Types} = require('mongoose');

const reactionsSchema = new Schema(
    {
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        }
    },
    {
        toJSON: {
        getters: true,
        },
        id: false,
    }
);

module.exports = reactionsSchema;