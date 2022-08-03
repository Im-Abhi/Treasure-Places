import React, { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import UsersList from "../components/UsersList";

const Users = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(() => {
        setIsLoading(true);
        const sendRequest = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users/');
                const responseData = await response.json();
                if (!response.ok) {
                    throw new Error(responseData.message);
                }
                setLoadedUsers(responseData.users);
            } catch (err) {
                setError(err.message);
            }
            setIsLoading(false);
        }
        sendRequest();
    }, []);

    const errorHandler = () => {
        setError(null);
    }

    return (
        <>
            <ErrorModal error={error} onClose={errorHandler} />
            {isLoading &&
                <div className="center">
                    <LoadingSpinner />
                </div>
            }
            {
                !isLoading && loadedUsers &&
                <UsersList items={loadedUsers} />
            }
        </>
    )
}

export default Users;