const { ObjectId } = require('mongoose').Types;
const {Thought, User} = require('../models');

module.exports = {

    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find()
            res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId})

            if (!thought){
                return res.status(404).json({ message: 'No thought with that ID'})
            };
            
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            console.log(req.body);
            const thought = await Thought.create(req.body);

            const user = await User.findOneAndUpdate(
                { username: req.body.username},
                { $addToSet: { thoughts: thought._id} },
                { new: true}
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Thought created but no user found with ID'
                })
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true}
            );

            if (!thought){
                return res.status(404).json({ message: 'No thought with that ID'})
            };
            
            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndRemove({_id: req.params.thoughtId})

            if (!thought){
                return res.status(404).json({ message: 'No thought with that ID'})
            };

            const user = await User.findOneAndUpdate(
                { username: req.body.username},
                { $pull: { thoughts: req.params.thoughtId} },
                { new: true}
            );

            if (!user) {
                return res.status(404).json({ message: 'Thought deleted but no user found associated with it'})
            }
            
            res.json('Thought deleted');
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    async addReaction(req, res) {
        try {
            const thoughts = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body}},
                { runValidators: true, new: true}
            );

            if(!thoughts) {
                return res.status(404).json({ message: 'No thought found'});
            };

            res.json(thoughts)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeReaction(req, res) {
        try {
            const thoughts = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.params.reactionId} } },
                { runValidators: true, new: true}
            );

            if(!thoughts) {
                return res.status(404).json({ message: 'No thought found'});
            };

            res.json(thoughts)
        } catch (err) {
            res.status(500).json(err);
        }
    },
}