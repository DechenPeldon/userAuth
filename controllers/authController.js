const bcrypt = require('bcrypt');
const db = require('../config/db');

const saltRounds = 10;

// Render the sign up page
exports.getSignUp = (req, res) => {
    res.render('pages/signup', { message: null });
};

// Handles sign up logic
exports.postSignUp = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser) {
            return res.render('pages/signup', { message: 'Email already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert new user
        await db.none(
            'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
            [name, email, hashedPassword, 'user']
        );

        res.render('pages/signup', { message: 'Registration successful! You can now log in.' });

    } catch (error) {
        console.error('Error during sign up:', error);
        res.render('pages/signup', { message: 'An error occurred during registration. Please try again.' });
    }
};

// Get login page
exports.getLogin = (req, res) => {
    res.render('pages/login', { message: null });
};

// Handle login logic
exports.postLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
        if (!user) {
            return res.render('pages/login', { message: 'Invalid email or password' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.render('pages/login', { message: 'Invalid email or password' });
        }

        // Set session
        req.session.userId = user.id;
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };

        res.redirect('/dashboard');

    } catch (error) {
        console.error('Error during login:', error);
        res.render('pages/login', { message: 'An error occurred during login. Please try again.' });
    }
};

// Handle logout
exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/');
    });
};

// Get landing page
exports.getLanding = (req, res) => {
    res.render('pages/landing');
};

// Get forgot password page
exports.getForgotPassword = (req, res) => {
    res.render('pages/forgot-password', { message: null });
};

// Get reset password page
exports.getResetPassword = (req, res) => {
    res.render('pages/reset-password', { message: null });
};
