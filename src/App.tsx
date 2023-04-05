import './App.css';
import React from "react";
import {Route, Routes} from "react-router-dom";

import {DiscordLoginHandler} from "./api/discord.api";
import UserModel from "./model/user.model";
import HomePage from "./pages/home";
import Login from "./components/login/login.component";
import {useCookies} from "react-cookie";

const App = () => {
    const [cookies, setCookie] = useCookies(['user']);

    const setUser = (user: UserModel, expires: Date): void => setCookie('user', JSON.stringify(user), {path: '/', expires})
    const getUser = (): UserModel => new UserModel(cookies.user) ?? new UserModel();

    const TempServer = (params: any) => <>Server {params.id}</>;

    return (
        <div className='App'>
            <Login open={getUser().isNull()} />
            <Routes>
                <Route path='/' element={<HomePage currentUser={getUser()}/>}>
                    <Route index element={<>MAIN</>}/>
                    <Route path='server/:id' element={<TempServer/>}/>
                </Route>
                <Route path='/auth/success' element={<DiscordLoginHandler setUser={setUser}/>}/>
                <Route path='/forbidden' element={<></>}/>
            </Routes>
        </div>
    );
}

export default App;