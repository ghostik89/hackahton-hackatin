import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import mySvg from "../logo.svg";
import {BASE_URL} from "../constants/RequestConstants";
import {SnackBar} from "../Components/SnackBar";
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const RegisterPage = ({history}) => {
    const classes = useStyles();
    const [role, setRole] = useState('student')
    const [user, setUser] = useState({
            "firstName": "",
            "lastName": "",
            "password": "",
            "userName": ""
    })
    const [showErr, setShowErr] = useState(false)

    const registerClick = e => {
        e.preventDefault()
        fetch(`${BASE_URL}api/users/registration/${role}`,{
                method:'POST',
                headers: new Headers({
                    "Content-type": "application/json;charset=utf-8"
                }),
                body: JSON.stringify(user)
        }).then(response => (response.ok ? '': Promise.reject(response))).then(() => {
            history.push({ pathname: '/' })
        }).catch(error => console.log(error))
    }

    const toLoginPage = e => {
        e.preventDefault()
        history.push({ pathname: '/' })
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <img  src={mySvg} alt={"B2School logo"}/>
                <Typography component="h1" variant="h5">
                    Зарегистрироваться
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="Имя"
                                autoFocus
                                onChange={e => setUser({...user, "firstName":e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="Фамилия"
                                name="lastName"
                                autoComplete="lname"
                                onChange={e => setUser({...user, "lastName":e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" style={{width: '100%'}}>
                                <InputLabel id="demo-simple-select-outlined-label">Роль</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={role}
                                    onChange={e => setRole(e.target.value)}
                                    label="Роль"
                                >
                                    <MenuItem value={'student'}>Ученик</MenuItem>
                                    <MenuItem value={'teacher'}>Учитель</MenuItem>
                                    <MenuItem value={'parent'}>Родитель</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Имя пользователя"
                                name="login"
                                autoComplete="login"
                                onChange={e => setUser({...user, "userName":e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Пароль"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={e => setUser({...user, "password":e.target.value})}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={registerClick}
                    >
                       Зарегистрироваться
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2" onClick={toLoginPage}>
                                У вас уже есть аккуант? Войдите в него
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
                message={"Нверно заполнены поля! Возможно, такой пользователь существует."}
            />
        </Container>
    );
}