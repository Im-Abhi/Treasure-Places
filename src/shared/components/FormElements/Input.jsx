import React, { useReducer } from "react";

import './Input.css';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: true
            };
        default:
            return state;
    }
}

const Input = (props) => {
    const [inputSate, dispatch] = useReducer(inputReducer, {
        value: '',
        isValid: false
    });

    const changeHandler = (e) => {
        dispatch({
            type: 'CHANGE',
            val: e.target.value
        });
    };

    const element = props.element === 'input' ?
        <input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            value={inputSate.value}
        /> :
        <textarea
            id={props.id}
            rows={props.rows || 3}
            style={{ "resize": "none" }}
            onChange={changeHandler}
            value={inputSate.value}
        />

    return (
        <div
            className={`form-control ${!inputSate.isValid && "form-control--invalid"}`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputSate.isValid && <p>{props.errorText}</p>}
        </div>
    )
}

export default Input;