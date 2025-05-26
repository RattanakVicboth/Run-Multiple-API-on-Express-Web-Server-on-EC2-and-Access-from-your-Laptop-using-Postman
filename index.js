const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(bodyParser.json());

// 🚀 Register a User
app.post('/register', async (req, res) => {
    const { username, email, job, password } = req.body;
    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({
                status: "400",
                message: "Username or email already exists",
                body: {}
            });
        }

        const userId = new mongoose.Types.ObjectId().toString();
        const user = new User({ userId, username, email, job, password });
        await user.save();

        res.status(201).json({
            status: "201",
            message: "User registered successfully",
            body: { userId }
        });
    } catch (err) {
        res.status(500).json({
            status: "500",
            message: "Error registering user",
            body: { error: err.message }
        });
    }
});

// 🚀 Login a User
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) {
            return res.status(401).json({
                status: "401",
                message: "Invalid credentials",
                body: {}
            });
        }

        res.status(200).json({
            status: "200",
            message: "Login successful",
            body: { userId: user.userId, username: user.username, email: user.email, job: user.job }
        });
    } catch (err) {
        res.status(500).json({
            status: "500",
            message: "Error logging in",
            body: { error: err.message }
        });
    }
});

// 🚀 Search all Users
app.get('/search', async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }); 
        if (!users.length) {
            return res.status(404).json({
                status: "404",
                message: "No users found",
                body: {}
            });
        }
        res.status(200).json({
            status: "200",
            message: "Users retrieved successfully",
            body: users
        });
    } catch (err) {
        res.status(500).json({
            status: "500",
            message: "Error fetching users",
            body: { error: err.message }
        });
    }
});


// 🚀 Update Profile by ID
app.put('/profile/:userId', async (req, res) => {
    const { userId } = req.params; // Get userId from the URL parameter
    const updates = req.body; // Get the updates from the request body

    try {
        const user = await User.findOneAndUpdate({ userId }, updates, { new: true, runValidators: true });
        if (!user) {
            return res.status(404).json({
                status: "404",
                message: "User not found",
                body: {}
            });
        }
        res.status(200).json({
            status: "200",
            message: "Profile updated successfully",
            body: user
        });
    } catch (err) {
        res.status(500).json({
            status: "500",
            message: "Error updating profile",
            body: { error: err.message }
        });
    }
});


// 🚀 Delete User by ID
app.delete('/delete/:userId', async (req, res) => {
    const { userId } = req.params; 

    try {
        const user = await User.findOneAndDelete({ userId });
        if (!user) {
            return res.status(404).json({
                status: "404",
                message: "User not found",
                body: {}
            });
        }
        res.status(200).json({
            status: "200",
            message: "User deleted successfully",
            body: { userId: user.userId }
        });
    } catch (err) {
        res.status(500).json({
            status: "500",
            message: "Error deleting user",
            body: { error: err.message }
        });
    }
});



const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
