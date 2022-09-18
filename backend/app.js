const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');

const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

// places route
app.use('/api/places', placesRoutes);

// user route
app.use('/api/users', usersRoutes);

// route not found 
app.use((req, res, next) => {
    throw new HttpError('Could not find this route!', 404);
});

// error handling
app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500)
        .json({ message: error.message || 'An unknown error occured!' });
});

const port = process.env.PORT || 5000;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server Started Successfully on PORT ${port}`);
        });
    }).
    catch(err => {
        console.log(err);
    });
