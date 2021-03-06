import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import mySvg from '../logo.svg'
import Container from '@material-ui/core/Container';
import { useAuth } from '../Context/auth'
import { BASE_URL} from '../constants/RequestConstants'
import { Base64 } from 'js-base64'
import {SnackBar} from "../Components/SnackBar";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import {Copyright} from "../Components/CopyRight";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#FAEE1C',
        color:'#000',
        width: theme.spacing(7),
        height: theme.spacing(7)
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const LoginPage = ({history}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [isSavePassword, setIsSavePassword] = useState(false)
    const [showErr, setShowErr] = useState(false)
    const [loader, setLoader] = useState(true)
    const { setAuthTokens } = useAuth()
    const classes = useStyles();

    useEffect( () => {
        const token = localStorage.getItem('token')
        if (token !== null){
            fetch(`${BASE_URL}api/users/login`, {
                headers: new Headers({
                    "Authorization": `Basic ${token}`
                })
            }).then(response => (response.ok ? response.json() : Promise.reject(response))).then(res => {
                setAuthTokens({ user: res, token: token })
                history.push({ pathname: '/home' })
            }).catch(() => {
                localStorage.clear()
                setLoader(false)
            })
        }
        if(token === null) setLoader(false)
    },[])

    const authClick = e => {
        e.preventDefault()
        fetch(`${BASE_URL}api/users/login`, {
            headers: new Headers({
                "Authorization": `Basic ${Base64.encode(`${login}:${password}`)}`
            })
        }).then(response => (response.ok ? response.json() : Promise.reject(response))).then(res => {
            const token = `${Base64.encode(`${login}:${password}`)}`
            setAuthTokens({ user: res, token: token })
            localStorage.setItem('token', token)
            history.push({ pathname: '/home' })
        }).catch(() => setShowErr(true))
    }

    const toRegisterPage = e =>{
        e.preventDefault()
        history.push({ pathname: '/register' })
    }
    return (
        <>
            {loader? <LinearProgress />:
                <Container component="main" maxWidth="xs">
                    <div className={classes.paper}>
                        <img src={mySvg} alt={"B2School logo"}/>
                        <Typography component="h1" variant="h5">
                            Войти в B2School
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="login"
                                label="Логин"
                                name="login"
                                autoComplete="email"
                                onChange={e => setLogin(e.target.value)}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Пароль"
                                type="password"
                                id="password"
                                onChange={e => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox
                                    value={isSavePassword}
                                    color="primary"
                                    onChange={e => setIsSavePassword(e.target.checked)}
                                />}
                                label="Запомнить меня"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={authClick}
                            >
                                Войти
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="#" variant="body2" onClick={toRegisterPage}>
                                        {"Еще не аккаунта? Зарегистируйтесь!"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Box mt={8}>
                        <Copyright />
                    </Box>
                    <SnackBar
                        open={showErr}
                        funcClose={() => setShowErr(false)}
                        severity={"error"}
                        message={"Неверный логин или пароль!"}
                    />
                </Container>}
        </>
    );
}