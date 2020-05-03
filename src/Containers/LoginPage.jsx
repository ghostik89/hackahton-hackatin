import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import mySvg from '../logo.svg'
import Container from '@material-ui/core/Container';
import { useAuth } from '../Context/auth'
import {Image} from "@material-ui/icons";

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
    const { authTokens, setAuthTokens } = useAuth()
    const classes = useStyles();

    useEffect( () => {
        const token = localStorage.getItem('token')
        if (token !== null){
            setAuthTokens({ user: 'res', token: 'token' })
            history.push({ pathname: '/home' })
        }
    },[])

    const authClick = e => {
        e.preventDefault()
        localStorage.setItem('token', 'token')
        setAuthTokens({ user: 'res', token: 'token' })
        history.push({ pathname: '/home' })
    }

    const toRegisterPage = e =>{
        e.preventDefault()
        history.push({ pathname: '/register' })
    }
    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                    <img  src={mySvg} />
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
                        control={<Checkbox value="remember" color="primary" />}
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
        </Container>
    );
}
