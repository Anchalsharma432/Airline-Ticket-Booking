const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Allow CORS
app.use(cors());

app.use(bodyParser.json());

const USERS_FILE = './users.json'; // JSON file to store user data

// Helper to read users from JSON
const readUsers = () => {
    if (!fs.existsSync(USERS_FILE)) return [];
    const data = fs.readFileSync(USERS_FILE);
    return JSON.parse(data);
};

// Helper to write users to JSON
const writeUsers = (users) => {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
};  

// Endpoint to save user data
app.post('/api/signup', (req, res) => {
    const userData = req.body;
    console.log("userdata...", userData);

    const filePath = 'users.json';

    // Read the existing data
    fs.readFile(filePath, 'utf-8', (err, data) => {
        let users = [];
        
        if (err) {
            // If file doesn't exist, initialize an empty array
            if (err.code === 'ENOENT') {
                console.log('File not found, creating a new one...');
            } else {
                console.error('Error reading file:', err);
                return res.status(500).send({ message: 'Error reading user data' });
            }
        } else {
            try {
                users = JSON.parse(data); // Parse JSON if file exists
            } catch (parseErr) {
                console.error('Invalid JSON in file:', parseErr);
                return res.status(500).send({ message: 'Invalid JSON data in file' });
            }
        }

        // Add the new user
        users.push(userData);

        // Write updated data back to file
        fs.writeFile(filePath, JSON.stringify(users, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to file:', writeErr);
                return res.status(500).send({ message: 'Error saving user data' });
            }

            console.log('User data saved successfully!');
            res.status(200).send({ message: 'User signed up successfully!' });
        });
    });
});



// Login Endpoint
// app.post('/api/login', async (req, res) => {
//     const { email, password } = req.body;

//     if (!email || !password) {
//         return res.status(400).json({ error: 'Email and password are required' });
//     }

//     const users = readUsers();
//     const user = users.find((u) => u.email === email);

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//         return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     res.json({ message: 'Login successful' });
// });

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ success: false, message: "Email and password are required." });
    }

    const filePath = 'users.json';

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).send({ success: false, message: "No users found. Please sign up first." });
    }

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading user data:', err);
            return res.status(500).send({ success: false, message: "Internal server error." });
        }

        let users = [];
        try {
            users = JSON.parse(data); // Parse existing users
        } catch (parseErr) {
            console.error('Invalid JSON format in users.json:', parseErr);
            return res.status(500).send({ success: false, message: "Corrupted user data file." });
        }

        const user = users.find((u) => u.email === email && u.password === password);

        if (user) {
            return res.status(200).send({
                success: true,
                message: "Login successful.",
                user: { fullName: user.name, email: user.email }, // Send limited user data
            });
        } else {
            return res.status(401).send({ success: false, message: "Invalid email or password." });
        }
    });
});



app.get('/api/user/:email', (req, res) => {
    const email = req.params.email;

    console.log("email...", email);
    const filePath = 'users.json';

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
        return res.status(404).send({ success: false, message: "User data not found." });
    }

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading user data:', err);
            return res.status(500).send({ success: false, message: "Internal server error." });
        }

        let users = [];
        try {
            users = JSON.parse(data);
        } catch (parseErr) {
            console.error('Invalid JSON format in users.json:', parseErr);
            return res.status(500).send({ success: false, message: "Corrupted user data file." });
        }

        const user = users.find((u) => u.email === email);

        if (user) {
            return res.status(200).send({ success: true, user });
        } else {
            return res.status(404).send({ success: false, message: "User not found." });
        }
    });
});

app.put("/api/user/update", (req, res) => {
    const updatedUser = req.body;

    fs.readFile("users.json", "utf-8", (err, data) => {
        if (err) {
            return res.status(500).send({ success: false, message: "Error reading user data" });
        }

        const users = JSON.parse(data) || [];
        const userIndex = users.findIndex((user) => user.email === updatedUser.email);

        if (userIndex === -1) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        // Update user data
        users[userIndex] = { ...users[userIndex], ...updatedUser };

        fs.writeFile("users.json", JSON.stringify(users, null, 2), (writeErr) => {
            if (writeErr) {
                return res.status(500).send({ success: false, message: "Error saving user data" });
            }

            res.status(200).send({ success: true, message: "User updated successfully!" });
        });
    });
});



// Forgot Password Endpoint
app.post('/api/forgot-password', (req, res) => {
    const { email } = req.body;

    const users = readUsers();
    const user = users.find((u) => u.email === email);

    if (!user) {
        return res.status(404).json({ error: 'Email not found' });
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.tokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
    writeUsers(users);

    res.json({ message: 'Password reset token generated', token: resetToken });
});

// Reset Password Endpoint
app.post('/api/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ error: 'Token and new password are required' });
    }

    const users = readUsers();
    const user = users.find((u) => u.resetToken === token && Date.now() < u.tokenExpiry);

    if (!user) {
        return res.status(400).json({ error: 'Invalid or expired token' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.tokenExpiry = null;
    writeUsers(users);

    res.json({ message: 'Password reset successful' });
});

// Start Server
const PORT = 4200;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
