import UserModel from "../../model/user.model";
import {Button} from "@mui/material";

type Props = {
    currentUser: UserModel,
    tokens: any,
};

const HomeComponent = ({ currentUser }: Props) => {
    return currentUser ? (<>Welcome {currentUser.username}#{currentUser.discriminator}</>) : (<Button>Login with Discord</Button>);
};

export default HomeComponent;