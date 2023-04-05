import './home.page.css';
import UserModel from '../../model/user.model';
import ServerNavbar from "../../components/server-navbar/server-navbar.component";
import React from "react";
import InfoNavbar from "../../components/info-navbar/info-navbar.component";
import {Outlet, useLocation, useParams} from "react-router-dom";
import {getGuildsByUserId} from "../../api/backend.api";
import GuildModel from "../../model/guild.model";

type Props = {
    currentUser: UserModel,
};

const HomePage = ({ currentUser }: Props) => {
    const location = useLocation();
    const main = location.pathname === '/';

    const params = useParams();
    const id: number = Number(params.id) ?? -1;

    const info: { main?: false, memberCount: number, victimCount: number, } |
                { main: true, got: number, wasGot: number, } = main ? {
        main: true,
        got: 5,
        wasGot: 5,
    } : {
        main: false,
        memberCount: 22,
        victimCount: 5,
    };

    const servers: GuildModel[] = [];
    if (!currentUser.isNull()) getGuildsByUserId(currentUser.id, (guilds) => { for (const guild of guilds) servers.push(guild); });

    const getName = () => main ? currentUser.isNull() ? 'Anonyme' : `${currentUser.username}#${currentUser.discriminator}` : servers[id].name;

    return (
        <>
            <ServerNavbar user={currentUser} servers={servers} />
            <div className='body'>
                <InfoNavbar name={getName()} info={info} />
                <main>
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default HomePage;