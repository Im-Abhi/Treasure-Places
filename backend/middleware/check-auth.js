const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];  // Authorization: 'Bearer TOKEN'
        if (!token) {
            throw new Error('Authorization failed!', 401);
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SCERET_KEY);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        return next(new HttpError('Authorization failed!', 401));
    }
}