import React,{useState} from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import './App.css';
import {LoginPage} from "./Containers/LoginPage";
import history from './history'
import {AuthContext} from './Context/auth'
import {PrivateRouter} from "./Components/PrivateRoueter";
import {HomePage} from "./Containers/HomePage";
import {NotFoundPage} from "./Containers/NotFoundPage";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { deepPurple, pink} from '@material-ui/core/colors'
import { ruRU } from '@material-ui/core/locale';
import {Copyright} from "./Components/CopyRight";
import Box from "@material-ui/core/Box";
import {Header} from "./Components/MobileHeader";
import {RegisterPage} from "./Containers/RegisterPage";


const theme = createMuiTheme({
    palette: {
        primary: deepPurple,
        secondary: pink
    },
    overrides:{
        MuiButton:{
            text:{
                color:'#fff'
            }
        }
    }
}, ruRU);

function App() {
    const [authTokens, setAuthTokens] = useState({user:{}, token:""});
    const setTokens = (data) => {
        setAuthTokens(data);
    }
    const logOut = () => {
        setAuthTokens({user:{}, token:""});
        localStorage.clear();
    }

    theme.typography.h1 = {
        fontSize: '6rem',
        fontWeight: 400,
        '@media (max-width:600px)': {
            fontSize: '3rem',
            fontWeight: 400,
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2.4rem',
        },
    }

    theme.typography.h2 = {
        fontSize: '4rem',
        fontWeight: 400,
        '@media (max-width:600px)': {
            fontSize: '2rem',
            fontWeight: 400,
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2.4rem',
        },
    }
    return (
        <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
            <Router history = {history}>
                <ThemeProvider  theme = {theme}>
                    <Switch>
                        <Route exact path={"/"} component={props => <LoginPage  {...props}/>}/>
                        <Route exact path={"/register"} component={props => <RegisterPage  {...props}/>}/>
                        <PrivateRouter exact path={"/home"} component={HomePage}/>
                        <Route path="*" component={props => <NotFoundPage{...props}/>}/>
                    </Switch>
                    <Box mt={8}>
                        <Copyright />
                    </Box>
                    {authTokens.token !== ''? <Header logout={logOut}/>:''}
                </ThemeProvider>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
