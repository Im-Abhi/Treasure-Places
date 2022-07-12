import React from "react";

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/utils/validators";

import './NewPlace.css';

const NewPlace = () => {
    return (
        <form className="place-form">
            <Input
                element="input"
                type="text"
                label="title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please Enter A Valid Title"
            />
        </form>
    )
}

export default NewPlace;
