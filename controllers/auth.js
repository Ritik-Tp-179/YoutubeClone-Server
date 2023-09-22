import jwt from "jsonwebtoken"
import users from "../models/auth.js"
export const login = async (req, res) => {
    const { email } = req.body;
    // console.log(email);
    try {
        const exsistingUser = await users.findOne({ email });
        if (!exsistingUser) {
            try {
                const newUser = await users.create({ email })

                const token = jwt.sign({
                    email: newUser.email, id: newUser._id
                }, process.env.JWT_SECRET, {
                    expiresIn: "1h"
                })
                res.status(200).json({ result: newUser, token })

            } catch (error) {
                res.status(500).json({ mess: "Something went wrong..." })
                // console.log(error)
            }
        } else {
            const token = jwt.sign({
                email: exsistingUser.email, id: exsistingUser._id
            }, process.env.JWT_SECRET, {
                expiresIn: "1h"
            })
            res.status(200).json({ result: exsistingUser, token })
        }
    } catch (error) {
        res.status(500).json({mess:"Something went wrong...."})
        // console.log(error)
    }
}