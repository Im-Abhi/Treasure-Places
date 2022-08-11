import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

import PlaceList from '../components/PlaceList';

const UserPlaces = () => {
    const { userId } = useParams();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState();

    useEffect(() => {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`);
                setLoadedPlaces(responseData.places);
            } catch (err) {

            }
        }
        fetchPlaces();
    }, [sendRequest, userId]);

    const placeDeleteHandler = (deletedPlaceId) => {
        setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId));
    }

    return (
        <>
            {isLoading &&
                <div className='center'>
                    <LoadingSpinner asOverlay />
                </div>
            }
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedPlaces &&
                <PlaceList items={loadedPlaces} onDeletePlace={placeDeleteHandler} />}
        </>
    )
};

export default UserPlaces;