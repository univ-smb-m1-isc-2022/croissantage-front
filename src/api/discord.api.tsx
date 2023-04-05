import React from "react";
import {Navigate} from "react-router-dom";
import UserModel from "../model/user.model";

const LoginURL = `http://localhost:8081/auth`;

type Props = {
    setUser: (user: UserModel, expires: Date) => void,
};

const DiscordLoginHandler = ({setUser}: Props) => {
    fetch(`${LoginURL}/fetch`)
        .then(res => res.json())
        .then(data => {
            let expires = new Date();
            expires.setSeconds(expires.getSeconds() + data.first.expiresIn);
            setUser(new UserModel(data.second), expires);
        });

    return <Navigate to='/' />;
};

export {LoginURL, DiscordLoginHandler};