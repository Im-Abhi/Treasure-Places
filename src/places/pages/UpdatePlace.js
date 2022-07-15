import React from "react";
import { useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators";

import './PlaceForm.css';

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the most famous sky scrapers in the world!',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address: '20 W 34th St, New York, NY 10001',
        location: {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    }
];

const UpdatePlace = () => {
    const { placeId } = useParams();

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

    if (!identifiedPlace) {
        return (
            <div className="center">
                <h2>Could Not Find Place!</h2>
            </div>
        )
    }

    return (
        <form className="place-form">
            <Input
                id="title"
                element="input"
                label="Title"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid Title."
                onInput={() => { }}
                value={identifiedPlace.title}
                valid={true}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                type="text"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid Description (at least 5 characters)."
                onInput={() => { }}
                value={identifiedPlace.description}
                valid={true}
            />
            <Button type="submit" disabled={true}>UPDATE PLACE</Button>
        </form>
    )
}

export default UpdatePlace;