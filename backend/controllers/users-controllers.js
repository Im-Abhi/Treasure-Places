const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, '-password');
    } catch (error) {
        return next(new HttpError('Fetching users failed, please try again later', 500));
    }

    res.json({ users: users.map(user => user.toObject({ getters: true })) });
}

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const { name, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (error) {
        return next(new HttpError('Signing up failed, please try again later.', 500));
    }

    if (existingUser) {
        return next(new HttpError('User already exists, please login instead.', 422));
    }

    const createdUser = new User({
        name,
        email,
        password,
        image: req.file.path,
        places: []
    });

    try {
        await createdUser.save();
    } catch (error) {
        return next(new HttpError('Signing up failed, please try again later.', 500))
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
}

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;

    try {
        existingUser = await User.findOne({ email: email });
    } catch (error) {
        return next(new HttpError('Login failed, please try again later.', 500));
    }

    if (!existingUser || existingUser.password !== password) {
        return next(new HttpError('Incorrect Email or password', 401));
    }

    res.json({
        message: 'Logged in!',
        user: existingUser.toObject({ getters: true })
    });
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
