const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const fs = require('fs');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const Place = require('../models/place');
const User = require('../models/user');

const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeId);
    } catch (error) {
        return next(new HttpError('Something went wrong could not find a place.', 500));
    }

    if (!place) {
        return next(new HttpError('Could not find a place for the provided id.', 404));
    }

    res.json({ place: place.toObject({ getters: true }) });
}

const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;
    // let places;
    let userWithPlaces;
    try {
        userWithPlaces = await User.findById(userId).populate('places');
    } catch (error) {
        return next(new HttpError('Fetching places failed, please try again later', 500));
    }

    // if(places || places.length === 0)
    if (!userWithPlaces || userWithPlaces.places.length === 0) {
        return next(new HttpError('Could not find places for the provided user id.', 404));
    }

    res.json({ places: userWithPlaces.places.map(place => place.toObject({ getters: true })) });
}

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const { title, description, address, creator } = req.body;

    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address);
    } catch (error) {
        return next(error);
    }

    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: req.file.path,
        creator
    });

    let user;

    try {
        user = await User.findById(creator);
    } catch (error) {
        return next(new HttpError('Creating place failed, please try again', 500));
    }

    if (!user) {
        return next(new HttpError('Could not find user for provided id.', 404));
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await createdPlace.save({ session });
        user.places.push(createdPlace);
        await user.save({ session });
        await session.commitTransaction();
    } catch (error) {
        return next(new HttpError('Creating place failed, please try again', 500));
    }

    res.status(201)
        .json({ place: createdPlace });
}

const updatePlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const placeId = req.params.pid;

    const { title, description } = req.body;

    let updatedPlace;

    try {
        updatedPlace = await Place.findOneAndUpdate({ id: placeId }, { title, description }, { new: true });
    } catch (error) {
        return next(new HttpError('Could not update the place, please try again later', 500));
    }

    res.status(200)
        .json({
            message: "Updated place successfully",
            place: updatedPlace.toObject({ getters: true })
        })
}

const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;

    let place;

    try {
        place = await Place.findById(placeId).populate('creator');
    } catch (error) {
        return next(new HttpError('Something went wrong, could not delete place', 500));
    }

    if (!place) {
        return next(new HttpError('Could not find a place with the provided id.', 404));
    }

    const imagePath = place.image;

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await place.remove({ session });
        place.creator.places.pull(place);
        await place.creator.save({ session });
        await session.commitTransaction();
    } catch (error) {
        return next(new HttpError('Deleting place failed, please try again', 500));
    }

    fs.unlink(imagePath, (err) => {
        console.log(err);
    })

    res.status(200).json({ message: 'Deleted Place successfully!' });
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
