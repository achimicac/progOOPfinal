import User from '../models/user';  // Assuming you have a User model
import bcrypt from 'bcrypt';

export const register = async (req, res) => {
    const { username, pw, fname, lname, email, phone, pfp } = req.body;

    try {
        if (!username || !pw || !fname || !lname || !email || !phone) {
            return res.json({
                status: 'error',
                error: 'Please enter all your information',
            });
        } else {
            const existingUser = await User.findOne({ $or: [{ username }, { email }] });

            if (existingUser) {
                if (existingUser.username === username && existingUser.email === email) {
                    res.json({ status: 'error', error: 'This username and email are already in use' });
                } else {
                    if (existingUser.username === username) {
                        res.json({ status: 'error', error: 'This username has already been in use' });
                    } else {
                        res.json({ status: 'error', error: 'This email has already been in use' });
                    }
                }
            } else {
                const hashedPassword = await bcrypt.hash(pw, saltRounds);
                const newUser = new User({
                    username,
                    pw: hashedPassword,
                    fname,
                    lname,
                    email,
                    phone,
                });

                await newUser.save();

                return res.json({ status: 'success', success: 'User has been registered' });
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
};
