import React from "react";
import {useAuth} from "../Context/auth";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {Header} from "../Components/MobileHeader";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ComplexGrid from "../Components/ComplexGrid";
import {HeaderS} from "../Components/Header";

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
            <HeaderS/>
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
