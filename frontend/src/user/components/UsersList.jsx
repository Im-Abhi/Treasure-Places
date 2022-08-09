import React from "react";

import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import './UsersList.css';

const UsersList = (props) => {
    return (
        (props.items.length === 0) ?
            <div className="center">
                <Card>
                    <h2>No Users Found!</h2>
                </Card>
            </div>
            :
            <ul className="users-list">
                {props.items.map(user => {
                    return (
                        <UserItem
                            key={user.id}
                            id={user.id}
                            image={user.image}
                            name={user.name}
                            placeCount={user.places.length}
                        />
                    )
                })}
            </ul>
    )
}

export default UsersList;
