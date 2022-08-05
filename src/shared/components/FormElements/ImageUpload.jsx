import react, { useRef } from "react";
import Button from "./Button";

import './ImageUpload.css';

const ImageUpload = (props) => {
    const filePickerRef = useRef();

    const pickedHandler = (event) => {
        console.log(event.target);
    }

    const pickImageHandler = () => {
        filePickerRef.current.click();
    }

    return (
        <>
            <div className="form-control">
                <input
                    ref={filePickerRef}
                    id={props.id}
                    name=""
                    type="file"
                    style={{ display: 'none' }}
                    accept=".jpg, .jpeg, .png"
                    onChange={pickedHandler}
                />
                <div className={`image-upload ${props.center && 'center'}`}>
                    <div className="image-upload__preview">
                        <img src="" alt="preview" />
                    </div>
                    <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
                </div>
            </div>
        </>
    )
}

export default ImageUpload;
