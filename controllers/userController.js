const {User} = require ('../models');

module.exports = {

    async getUsers(req, res) {
        try{
            const users = await User.find();
            res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
    // Get user by id
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({_id: req.params.userId})
                .populate('thoughts').populate('friends');
            if(!user) {
                return res.status(404).json({message: 'No user with that ID'});
            };
            res.json({user})
        } catch (err){
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err){
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true}
            );

            if (!User){
                return res.status(404).json({ message: 'No User with that ID'})
            };
            
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {

            const user = await User.findOneAndRemove({_id: req.params.userId})

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID'})
            }
            
            res.json('User deleted');
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
}