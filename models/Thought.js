const {Schema, model} = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
);

    thoughtsSchema
        .virtual('reactionCount')
        .get(function () {
            return this.reactions.length;
        });

const Thought = model('thought', thoughtsSchema);

module.exports = Thought;
