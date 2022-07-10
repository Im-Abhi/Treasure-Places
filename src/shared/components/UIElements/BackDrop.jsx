import React from "react";
import ReactDOM from "react-dom";

import './BackDrop.css';

const BackDrop = (props) => {
    return ReactDOM.createPortal(
        <div className="backdrop" onClick={props.onClick}></div>
        , document.getElementById('backdrop-hook'))
}

export default BackDrop;