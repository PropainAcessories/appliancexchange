import React from "react";
import Auth  from '../utils/auth'

function Profile() {
    if (Auth.loggedIn()) {
        return (
            <div className="container">
                <p>Is UwU a noise or a face?</p>
            </div>
        );
    } else {
        return (
            <div className="container">
                <p>You need to log in to see the question</p>
            </div>
        )
    }
};

export default Profile;