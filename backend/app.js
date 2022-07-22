const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use('/api/places', placesRoutes);

app.use((req, res, next) => {
    throw new HttpError('Could not find this route!', 404);
})

app.use((error, req, res, next) => {
    if (res.headerSent) {
        next(error);
    }
    res.status(error.code || 500)
        .json({ message: error.message || 'An unknown error occured!' });
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Started Successfully on PORT ${PORT}`);
});
