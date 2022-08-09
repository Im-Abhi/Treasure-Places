import { useEffect, useRef, useState } from "react";
import Button from "./Button";

import './ImageUpload.css';

const ImageUpload = (props) => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    const filePickerRef = useRef();

    useEffect(() => {
        if (!file) {
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);

    }, [file]);

    const pickedHandler = (e) => {
        let pickedFile;
        let fileIsValid = isValid;
        if (e.target.files && e.target.files.length === 1) {
            pickedFile = e.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        } else {
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid);
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
                        {previewUrl && <img src={previewUrl} alt="preview" />}
                        {!previewUrl && <p>Please pick and image.</p>}
                    </div>
                    <Button type="button" onClick={pickImageHandler}>PICK IMAGE</Button>
                </div>
                {!isValid && <p>{props.errorText}</p>}
            </div>
        </>
    )
}

export default ImageUpload;
