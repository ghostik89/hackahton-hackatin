import React,{useState} from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import './App.css';
import {LoginPage} from "./Containers/LoginPage";
import history from './history'
import {AuthContext} from './Context/auth'
import {PrivateRouter} from "./Components/PrivateRoueter";
import {HomePage} from "./Containers/HomePage";
import {NotFoundPage} from "./Containers/NotFoundPage";

function App() {
    const [authTokens, setAuthTokens] = useState({user:{}, token:""});
    const setTokens = (data) => {
        setAuthTokens(data);
    }
    const logOut = () => {
        setAuthTokens({user:{}, token:""});
        localStorage.clear();
    }
    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
            <Router history = {history}>
                <Switch>
                    <Route exact path={"/"} component={props => <LoginPage   {...props}/>}/>
                    <PrivateRouter exact path={"/home"} component={HomePage}/>
                    <Route path="*" component={props => <NotFoundPage{...props}/>}/>
                </Switch>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
