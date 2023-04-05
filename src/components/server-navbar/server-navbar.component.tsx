import './server-navbar.component.css';
import NavbarButton from "./navbar-button.component";
import add from '../../icons/plus-solid.svg';
import {Divider} from "@mui/material";
import {BotInviteURL} from "../../api/backend.api";
import UserModel from "../../model/user.model";

type Props = {
    user: UserModel,
    servers: { id: number, name: string }[],
};

const ServerNavbar = ({ user, servers }: Props) => {
    const { userId, avatar  } = user;

    return (
        <div className='server-navbar'>
            <NavbarButton to='/' alt='Menu principal' id={userId} src={avatar} />
            <Divider sx={{borderColor: '#727272', width: '4vw', margin: '0.25em 0'}} />
            {servers.map(server => <NavbarButton key={server.id} alt={server.name} id={`${server.id}`} src={avatar} to={`/server/${server.id}`} server />)}
            <NavbarButton to={BotInviteURL} alt='Add server' id={'0'} src={add} add />
        </div>
    );
}

export default ServerNavbar;