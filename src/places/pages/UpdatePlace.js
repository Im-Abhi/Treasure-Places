import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/components/hooks/form-hook";
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

    const [isLoading, setIsLoading] = useState(true);

    const [formState, inputHandler, setFormData] = useForm({
        title: {
            value: '',
            isValid: false,
        },
        description: {
            value: '',
            isValid: false
        }
    }, false);

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

    useEffect(() => {
        setFormData({
            title: {
                value: identifiedPlace.title,
                isValid: true,
            },
            description: {
                value: identifiedPlace.description,
                isValid: true
            }
        }, true);
        setIsLoading(false);
    }, [setFormData, identifiedPlace]);


    const placeUpdateSubmitHandler = (e) => {
        e.preventDefault();
        console.log(formState.inputs);
    }

    if (!identifiedPlace) {
        return (
            <div className="center">
                <h2>Could Not Find Place!</h2>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className="center">
                <h2>Loading...</h2>
            </div>
        )
    }

    return (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input
                id="title"
                element="input"
                label="Title"
                type="text"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid Title."
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                type="text"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid Description (at least 5 characters)."
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>UPDATE PLACE</Button>
        </form>
    )
}

export default UpdatePlace;