import User from '../models/user';  // Assuming you have a User model
import jwt from 'jsonwebtoken';

export const userEdit = async (req, res, next) => {
    const { username, fname, lname, email, phone, pfp } = req.body;
    const userId = jwt.decode(req.cookies.userRegistered, process.env.JWT_SECRET).id;

    try {
        // Use Mongoose methods to update user information
        const updatedUser = await User.findByIdAndUpdate(userId, {
            username,
            fname,
            lname,
            email,
            phone,
            pfp,
        }, { new: true });

        if (!updatedUser) {
            console.log("Can't edit user information. User not found.");
            return res.json({ status: 'error', error: "Can't edit user information. User not found." });
        }

        console.log('Edit user inform success');
        res.json({ status: 'success', success: 'Edit Success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
};
