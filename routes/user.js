import express from 'express';
const router = express.Router();

import bcrypt from 'bcrypt';
import User from './../models/user.js'; // обязательно .js в пути, если ты в ES-модуле
import jwt from 'jsonwebtoken';

// Signup
router.post('/signup', (req, res) => {
    let {name, userEmail, password} = req.body;
    name = name.trim();
    userEmail = userEmail.trim();
    password = password.trim();

    if (name === '' || userEmail === '' || password === '') {
        res.json({
            status: 'FAILED', 
            message: 'Empty input fields!'
        })
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
        res.json({
            status: 'FAILED',
            message: 'Invalid name entered'
        })
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userEmail)) {
        res.json({
            status: 'FAILED',
            message: 'Invalid email entered'
        })        
    } else if (password.length < 8) {
        res.json({
            status: 'FAILED',
            message: 'Password is too short'
        })
    } else {
        // Checking if user already exists
        User.find({userEmail}).then(result => {
            if (result.length) {
                // User already exists
                res.json({
                    status: 'FAILED',
                    message: 'User with the provided email already exists'
                })
            } else {
                // Try to create new user 

                // Password handling
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newUser = new User({
                        name,
                        userEmail,
                        password: hashedPassword
                    });

                    newUser.save().then(result => {
                        res.json({
                            status: 'SUCCESS',
                            message: 'Signup successful',
                            date: result,
                        })
                    }).catch(err => {
                    res.json({
                        status: 'FAILED',
                        message: 'An error occured while saving user account!'
                    })
                })
                }).catch(err => {
                    res.json({
                        status: 'FAILED',
                        message: 'An error occured while hashing password!'
                    })
                })
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status: 'FAILED',
                message: 'An error occurred while checking for existing user!'
            })
        })
    }
})

// Signin 
router.post('/signin', (req, res) => {
    let { userEmail, password } = req.body;
    userEmail = userEmail.trim();
    password = password.trim();

    if (userEmail === '' || password === '') {
        return res.json({
            status: 'FAILED',
            message: 'Empty credentials supplied'
        });
    }

    // check if user exists
    User.findOne({ userEmail })
        .then(user => {
            if (!user) {
                return res.json({
                    status: 'FAILED',
                    message: 'Неверный email'
                });
            }

            // compare password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) {
                        return res.json({
                            status: 'FAILED',
                            message: 'Пароль введен не правильно'
                        });
                    }

                    // Create JWT token
                    const token = jwt.sign(
                        { id: user._id, email: user.userEmail },
                        process.env.JWT_SECRET, 
                        { expiresIn: '1h' }
                    );
                    res.json({
                        status: 'SUCCESS',
                        message: 'Signin successful',
                        token,
                        user: {
                            id: user._id,
                            name: user.name,
                            email: user.userEmail
                        }
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.json({
                        status: 'FAILED',
                        message: 'An error occurred while checking password'
                    });
                });
        })
        .catch(err => {
            console.log(err);
            res.json({
                status: 'FAILED',
                message: 'An error occurred while checking for existing user'
            });
        });
});

export default router