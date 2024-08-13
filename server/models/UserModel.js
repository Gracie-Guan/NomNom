const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile_image: { type: String },
    ethnicity: { type: String },
    dietary_restrictions: { type: [String], default: [] },
    dining_preferences: { type: [String], default: [] },
    points: { type: Number, default: 0 },
    notification_settings: { type: Object, default: {} },
    favourite_restaurant: { type: [String], default: [] },
    favourite_dish: { type: [String], default: [] }
});

const User = mongoose.model('User', userSchema);

class UserModel {
    static async register(username, email, password, ethnicity, dietary_restrictions, dining_preferences ){
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            ethnicity,
            dietary_restrictions:[],
            dining_preferences:[],
        });

        try {
            await newUser.save();
            return newUser._id;
        } catch (error) {
            console.error("Error in register:", error);
            throw error;
        }
    }

    static async login(email, password) {
        try {
            const user = await User.findOne({ email });
            if (user && await bcrypt.compare(password, user.password)) {
                return user;
            } else {
                throw new Error('Invalid email or password');
            }
        } catch (error) {
            console.error("Error in login:", error);
            throw error;
        }
    }

    static async resetPassword(email, newPassword) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        try {
            const user = await User.findOne({ email });
            if (user) {
                user.password = hashedPassword;
                await user.save();
                return true;
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            console.error("Error in resetPassword:", error);
            throw error;
        }
    }

}

module.exports = UserModel;