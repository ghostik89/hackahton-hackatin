import React from "react";
import {useAuth} from "../Context/auth";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Header} from "../Components/MobileHeader";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ComplexGrid from "../Components/ComplexGrid";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginBottom: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        width: '100%',
        minHeight: '8em',
        backgroundColor: '#F3D516'
    },
    page:{
        paddingTop:'2rem'
    },
    list:{
        width: '100%',
        minWidth: 360,
        backgroundColor: theme.palette.background.paper,
    }
}));

export const AccountPage = ({history}) => {
    const {authTokens} = useAuth()
    const classes = useStyles()

    return(
        <div>
            <Paper className={classes.paper} elevation={3}>
                <Container className={classes.page}>
                    <Grid container spacing={3}>
                        <Typography variant="h1" component="h2" gutterBottom>B2S:ARITHMET</Typography>
                    </Grid>
                </Container>
            </Paper>
            <Container>
                <Typography  variant="h2" component="h2" gutterBottom>Аккаунт</Typography>
                <ComplexGrid user = {authTokens.user}/>
                <Paper>
                </Paper>
            </Container>
            <Header value={2} history = {history}/>
        </div>
    );

};
