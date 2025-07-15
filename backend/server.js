const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors());

// ✅ Correct MongoDB Connection String
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("✅ DB connected");
}).catch((err) => {
    console.log("❌ Connection error:", err);
});

// ✅ User Schema
const userSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: { type: String, unique: true },
    gender: String
});

const User = mongoose.model('User', userSchema);

// ✅ CREATE - Add new user
app.post('/users', async (req, res) => {
    try {
        const { name, password, email, gender } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered!' });
        }

        const newUser = new User({ name, password, email, gender });
        await newUser.save();
        res.status(201).json({ message: 'Signup successful!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// ✅ READ - Get all users
app.get('/users', async (req, res) => {
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

// ✅ UPDATE - Update user by ID
app.put('/users/:id', async (req, res) => {
    try {
        const { name, password, email, gender } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, password, email, gender },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

// ✅ DELETE - Delete user by ID
app.delete('/users/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

// ✅ Start Server
const port = process.env.PORT || 3002;  // ✅ First check Render's port, fallback to 3002 locally
app.listen(port, () => {
    console.log("✅ Server running on port " + port);
});
