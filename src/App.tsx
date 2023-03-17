import './App.css';
import React, {useState} from "react";
import {Route, Routes} from "react-router-dom";

import {DiscordLoginHandler} from "./api/discord";
import UserModel from "./model/user.model";
import HomeComponent from "./pages/home";

const App = () => {
    const [currentUser, setCurrentUser] = useState(new UserModel());

    return (
        <>
            <Routes>
                <Route path='/' element={<HomeComponent currentUser={currentUser} tokens={null} />} />
                <Route path='/auth/success' element={<DiscordLoginHandler setCurrentUser={setCurrentUser} />} />
                <Route path='/auth/forbidden' element={<></>} />
            </Routes>
        </>
    );
}

export default App;