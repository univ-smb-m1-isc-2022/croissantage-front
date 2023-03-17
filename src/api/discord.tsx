import React from "react";
import {Link} from "react-router-dom";
import UserModel from "../model/user.model";

const URL = `http://localhost:8081/auth`;

type Props = {
    setCurrentUser: React.Dispatch<React.SetStateAction<UserModel>>;
    // setTokens: React.Dispatch<React.SetStateAction<TokensModel>>;
};

const DiscordLoginButton = () => {
    return (
        <Link to={URL}>Login with Discord</Link>
    );
};

const DiscordLoginHandler = ({setCurrentUser}: Props) => {
    fetch(`${URL}/fetch`)
        .then(res => res.json())
        .then(data => {
            setCurrentUser(data.second);
            // setTokens(data.first);
            console.log(data);
        });

    return <></>;
};

export {DiscordLoginButton, DiscordLoginHandler};