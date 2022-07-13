import React, { useCallback } from "react";

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators";

import './NewPlace.css';

const NewPlace = () => {
    const titleInputHandler = useCallback((id, value, isValid) => { }, []);
    const descriptionInputHandler = useCallback((id, value, isValid) => { }, []);

    return (
        <form className="place-form">
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please Enter A Valid Title"
                onInput={titleInputHandler}
            />
            <Input
                id="description"
                element="textarea"
                label="Description"
                validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH()]}
                errorText="Please Enter A Valid Description (al teast 5 charcters)"
                onInput={descriptionInputHandler}
            />
        </form>
    )
}

export default NewPlace;
