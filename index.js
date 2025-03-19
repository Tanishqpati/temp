const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Validation function
const validateSignup = (data) => {
    const { username, email, password, dateOfBirth } = data;

    if (!username) return { error: "Username cannot be empty" };
    if (!email) return { error: "Email cannot be empty" };
    if (!password || password.length < 8 || password.length > 16) {
        return { error: "Password length should be greater than 8 or less than or equal to 16" };
    }
    return { validData: { username, email, password, dateOfBirth } };
};

// Signup endpoint
app.post('/signup', (req, res) => {
    const { error, validData } = validateSignup(req.body);
    if (error) {
        return res.status(400).json({ error });
    }
    
    // Simulate user registration success
    res.status(201).json({ message: "User registered successfully!", data: validData });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});