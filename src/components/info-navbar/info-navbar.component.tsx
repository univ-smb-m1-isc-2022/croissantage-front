import './info-navbar.component.css';
import {Button} from "@mui/material";

type Props = {
    name: string,
    info: {
        main?: false,
        memberCount: number,
        victimCount: number,
    } | {
        main: true,
        got: number,
        wasGot: number,
    },
};

const InfoNavbar = ({ name, info = { main: false, memberCount: 0, victimCount: 0 } }: Props) => {


    return (
        <div className='info-navbar'>
            <section>
                <div>
                    <h3>{name}</h3>
                    <span>
                        <h4>
                        {
                            info.main
                                ? `Croissantés / Croissantages : ${info.wasGot} / ${info.got}`
                                : `${info.memberCount} membres • ${info.victimCount} croissantés`
                        }
                        </h4>
                    </span>
                </div>
                {!info.main && <Button variant='contained' className='signal-button'>Signaler un croissantage</Button>}
            </section>
        </div>
    );
};

export default InfoNavbar;