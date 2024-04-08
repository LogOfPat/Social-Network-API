const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, `Enter a valid email`]
        },
        thoughts:  [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            },
        ],
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'user'
            }
        ],
    }
);

    userSchema
        .virtual('friendCount')
        .get(function () {
            return this.friends.length;
        })
        .set(function(v) {
            const friendCount = v;
            this.set({friendCount})
        }) 

const User = model('user', userSchema);

module.exports =  User;