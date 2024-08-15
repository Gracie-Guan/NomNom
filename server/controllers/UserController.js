const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

class UserController {
    static async register(req, res) {
        const { username, email, password, ethnicity, dietary_restrictions, dining_preferences } = req.body;
        try {
            const userId = await UserModel.register(username, email, password, ethnicity, dietary_restrictions, dining_preferences);
            const token = generateToken(userId);
            res.status(201).json({ userId, token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;
        try {
            const user = await UserModel.login(email, password);
            const token = generateToken(user._id);
            res.status(200).json({ 
                userId: user._id,
                username: user.username,
                email: user.email,
                ethnicity: user.ethnicity,
                dietary_restrictions: user.dietary_restrictions,
                dining_preferences: user.dining_preferences,
                points: user.points,
                favourite_restaurant: user.favourite_restaurant,
                favourite_dish: user.favourite_dish,
                token: token
            });
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    static async resetPassword(req, res) {
        const { email, newPassword } = req.body;
        try {
            await UserModel.resetPassword(email, newPassword);
            res.status(200).json({ message: 'Password reset successful' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async getUserById(req, res) {
        const { userId } = req.params;
        try {
            const user = await UserModel.getUserById(userId);
            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
}

module.exports = UserController;