import { Router } from 'express';
import User from '../model/User.js';

const userRouter = Router();

// get all users
userRouter.get('/', async(_, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error Fetching Users", error});
    }
});

userRouter.get('/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const user = await User.findOne({username});
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.json(user);
    }
    catch(error) {
        res.status(500).json({message:`Error fetching user ${username}`, error});
    }
})

export default userRouter;