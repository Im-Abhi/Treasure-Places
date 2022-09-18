import { useEffect, useState } from "react";

import './ImageUpload.css';

const ImageUpload = (props) => {
    const { onInput, id } = props;
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);
    const [image, setImage] = useState();

    function showUploadWidget() {
        window.cloudinary.openUploadWidget({
            cloudName: `${process.env.REACT_APP_CLOUD_NAME}`,
            uploadPreset: `${process.env.REACT_APP_PRESET}`,
            sources: [
                "local",
                "camera",
                "url",
            ],
            showAdvancedOptions: false,
            cropping: true,
            multiple: false,
            defaultSource: "local",
            styles: {
                palette: {
                    window: "#FFFFFF",
                    windowBorder: "#90A0B3",
                    tabIcon: "#0078FF",
                    menuIcons: "#5A616A",
                    textDark: "#000000",
                    textLight: "#FFFFFF",
                    link: "#0078FF",
                    action: "#FF620C",
                    inactiveTabIcon: "#0E2F5A",
                    error: "#F44235",
                    inProgress: "#0078FF",
                    complete: "#20B832",
                    sourceBg: "#E4EBF1"
                },
                fonts: {
                    default: null,
                    "'Fira Sans', sans-serif": {
                        url: "https://fonts.googleapis.com/css?family=Fira+Sans",
                        active: true
                    }
                }
            }
        }, (err, result) => {
            if (!err && result?.event === 'success') {
                setImage(result.info.secure_url);
                setIsValid(true);
                onInput(props.id, result.info.secure_url, true);
            }
        });
    }

    useEffect(() => {
        if (image) {
            setPreviewUrl(image);
            setIsValid(true);
            onInput(id, image, true);
        }
    }, [image, onInput, id]);

    return (
        <>
            <div className="form-control">
                <div className={`image-upload ${props.center && 'center'}`}>
                    <div className="image-upload__preview">
                        {previewUrl && <img src={previewUrl} alt="preview" />}
                        {!previewUrl && <p>Please pick an image.</p>}
                    </div>
                    <button className="button" type="button" onClick={showUploadWidget}>PICK IMAGE</button>
                </div>
                {!isValid && <p>{props.errorText}</p>}
            </div>
        </>
    )
}

export default ImageUpload;
