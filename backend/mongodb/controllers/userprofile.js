import User from '../models/user';  // Assuming you have a User model
import jwt from 'jsonwebtoken';

export const userprofile = async (req, res, next) => {
    const userRegisteredCookie = req.cookies.userRegistered;
    const decodedToken = jwt.decode(userRegisteredCookie, process.env.JWT_SECRET);

    try {
        // Use Mongoose methods to query user information
        const userProfile = await User.findById(decodedToken.id);

        if (!userProfile) {
            console.log("Can't find this user");
            return res.json({ status: 'error', error: "Can't find this user" });
        }

        // Add user profile data to response
        res.userdata = userProfile;
        next();
    } catch (error) {
        console.error(error);
        throw error;
    }
};
