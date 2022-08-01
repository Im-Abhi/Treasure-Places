const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Max Schwarz',
        email: 'test@test.com',
        password: 'testers'
    }
]

const getUsers = (req, res, next) => {
    res.json({ users: DUMMY_USERS });
}

const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const { name, email, password, places } = req.body;

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
        image: 'https://www.psdgraphics.com/file/user-icon.jpg',
        places
    });

    try {
        await createdUser.save();
    } catch (error) {
        return next(new HttpError('Signing up failed, please try again later.', 500))
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
}

const login = (req, res, next) => {
    const { email, password } = req.body;

    const identifiedUser = DUMMY_USERS.find(u => u.email === email);

    if (!identifiedUser || identifiedUser.password !== password) {
        return next(new HttpError('Incorrect Email or password', 401));
    }

    res.json({ message: 'Logged in!' });
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
