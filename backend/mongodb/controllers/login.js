import User from '../models/user';  // Assuming you have a User model
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req, res) => {
    try {
        const { username, pw } = req.body;
        console.log("From login" + username + " " + pw);

        if (!username || !pw) {
            return res.json({
                status: "error",
                error: "Please enter your username and password",
            });
        } else {
            const user = await User.findOne({ username });

            if (!user) {
                return res.json({
                    status: "error",
                    error: "Account not found or incorrect password",
                });
            } else {
                const storedHashedPassword = user.pw;

                bcrypt.compare(pw, storedHashedPassword, (error, isMatch) => {
                    if (error) {
                        throw error;
                    }

                    if (isMatch) {
                        const id = user._id;
                        const token = jwt.sign(
                            { id: id },
                            process.env.JWT_SECRET,
                            {
                                expiresIn: "30m", // or use process.env.JWT_EXPIRES
                            }
                        );
                        const cookieOptions = {
                            expiresIn: new Date(
                                Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                            ),
                            httpOnly: true,
                            path: '/',
                        };

                        res.cookie("userRegistered", token, cookieOptions);
                        res.status(200).json({
                            status: "success",
                            success: "User logged in",
                            token,
                            cookieOptions,
                        });
                    } else {
                        return res.json({
                            status: "error",
                            error: "Account not found or incorrect password",
                        });
                    }
                });
            }
        }
    } catch (err) {
        console.log(err);
        res.json({ status: "error", error: "Something went wrong" });
    }
};
