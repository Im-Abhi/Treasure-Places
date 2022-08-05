import React, { Fragment, useContext, useState } from 'react';
import Button from '../../shared/components/FormElements/Button';

import Card from '../../shared/components/UIElements/Card';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import Map from '../../shared/components/UIElements/Map';
import Modal from '../../shared/components/UIElements/Modal';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './PlaceItem.css';

const PlaceItem = (props) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const { userId } = useContext(AuthContext);

    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const [showMap, setShowMap] = useState(false);

    const openMapHandler = () => setShowMap(true);

    const closeMapHandler = () => setShowMap(false);

    const showDeleteWarningHandler = () => setShowConfirmModal(true);

    const cancelDeleteHandler = () => setShowConfirmModal(false);

    const confirmDeleteHandler = async () => {
        setShowConfirmModal(false);
        try {
            await sendRequest(
                `http://localhost:5000/api/places/${props.id}`,
                'DELETE'
            );
            props.onDelete(props.id);
        } catch (err) {

        }
    }
    return (
        <Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className="map-container">
                    <Map
                        center={props.coordinates}
                        zoom={16}
                    />
                </div>
            </Modal>
            <Modal
                show={showConfirmModal}
                onCancel={cancelDeleteHandler}
                header="Are you Sure?"
                footerClass="place-item__modal-actions"
                footer={
                    <Fragment>
                        <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                        <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                    </Fragment>
                }
            >
                <p>Do you want to proceed and delete this place? Please note this can't be undone thereafter</p>
            </Modal>
            <li className="place-item">
                <Card className="place-item__content">
                    {isLoading && <LoadingSpinner asOverlay />}
                    <div className="place-item__image">
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={openMapHandler}>VIEW ON MAP</Button>
                        {
                            userId === props.creatorId &&
                            <Button to={`/places/${props.id}`}>EDIT</Button>
                        }
                        {
                            userId === props.creatorId &&
                            <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
                        }
                    </div>
                </Card>
            </li>
        </Fragment>
    );
};

export default PlaceItem;
