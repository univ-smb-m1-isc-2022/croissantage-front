import {Avatar, Badge, IconButton, Tooltip} from "@mui/material";
import { FaPlus } from 'react-icons/fa';
import {Link, useLocation} from "react-router-dom";

type Props = {
    alt: string,
    id: string,
    src: string,
    to: string,
    server?: boolean,
    add?: boolean,
};

function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

const NavbarButton = ({alt, id, src, to, server = false, add = false}: Props) => {
    const location = useLocation();

    const buttonStyle = {
        width: '3em',
        height: '3em',
        borderRadius: (to === location.pathname && !add) ? '0.5em' : '1.5em',
        backgroundColor: stringToColor(alt),
        transition: 'border-radius 50ms ease-in-out',
    };

    const addStyle = {
        ...buttonStyle,
        width: '1.5em',
        height: '1.5em',
        padding: '0.5em',
        color: 'white',
        outline: '1px dashed white',
        outlineOffset: '-1px',
        backgroundColor: 'transparent',
    };

    return (
        <Tooltip title={<span style={{fontSize: '1.25em'}}>{alt}</span>} placement='right' arrow>
            <IconButton disableRipple component={Link} to={to} target={add ? '_blank' : '_self'}>
                {
                    server ? (
                        <Badge badgeContent={0} color='error'>
                            <Avatar alt={alt} src={`https://cdn.discordapp.com/icons/${id}/${src}.png`} sx={buttonStyle}/>
                        </Badge>
                    ) : add ? (
                        <FaPlus style={addStyle} />
                    ) : (
                        <Avatar alt={alt} src={`https://cdn.discordapp.com/avatars/${id}/${src}.png`} sx={buttonStyle}/>
                    )
                }
            </IconButton>
        </Tooltip>
    );
};

export default NavbarButton;