import React, { useReducer } from "react";

import { validate } from '../../utils/validators';
import './Input.css';

const inputReducer = (state, action) => {
    switch (action.type) {
        case 'CHANGE':
            return {
                ...state,
                value: action.val,
                isValid: validate(action.val, action.validators)
            };
        case 'TOUCH':
            return {
                ...state,
                isTouched: true,
            }
        default:
            return state;
    }
}

const Input = (props) => {
    const [inputSate, dispatch] = useReducer(inputReducer, {
        value: '',
        isValid: false,
        isTouched: false
    });

    const changeHandler = (e) => {
        dispatch({
            type: 'CHANGE',
            val: e.target.value,
            validators: props.validators
        });
    };

    const touchHandler = () => {
        dispatch({
            type: 'TOUCH',
        })
    }

    const element = props.element === 'input' ?
        <input
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputSate.value}
        /> :
        <textarea
            id={props.id}
            rows={props.rows || 3}
            style={{ "resize": "none" }}
            onChange={changeHandler}
            onBlur={touchHandler}
            value={inputSate.value}
        />

    return (
        <div
            className={`form-control ${!inputSate.isValid && inputSate.isTouched && "form-control--invalid"}`}
        >
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputSate.isValid && inputSate.isTouched &&
                <p>{props.errorText}</p>}
        </div>
    )
}

export default Input;