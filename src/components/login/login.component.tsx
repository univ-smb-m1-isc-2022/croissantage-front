import './login.component.css';
import {LoginURL} from '../../api/discord.api';
import React from 'react';
import {Avatar, Backdrop, Button} from "@mui/material";
import {Link} from "react-router-dom";
import {FaDiscord} from "react-icons/fa";

type Props = {
    open: boolean,
}

const Login = ({ open }: Props) => {
    return (
        <Backdrop open={open} style={{zIndex: 100}}>
            <div className='login-popup'>
                <div className='title'>
                    <Avatar src='./logo512.png' sx={{width: 200, height: 200}} />
                    <h1>Nouvel utilisateur ?</h1>
                    <h4>Veuillez vous connecter afin d'accéder à vos données de croissantage.</h4>
                </div>
                <Button
                    component={Link}
                    to={LoginURL}
                    variant='contained'
                    startIcon={<FaDiscord />}
                    className='login-with-discord'
                >
                    Se connecter avec Discord
                </Button>
            </div>
        </Backdrop>
    );
}

export default Login;