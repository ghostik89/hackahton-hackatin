import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import FunctionsIcon from "@material-ui/icons/Functions";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

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
    icon:{
        fontSize: '5rem',
        '@media (max-width:600px)': {
            fontSize: '4rem',
            fontWeight: 400,
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '5rem',
        },
    }
}));

export const HeaderS = () => {
    const classes = useStyles()
    return(
        <Paper className={classes.paper} elevation={3}>
        <Container className={classes.page}>
            <Grid container spacing={3}>
                <FunctionsIcon className={classes.icon}/>
                <Typography variant="h1" component="h2" gutterBottom>Арифметика</Typography>
            </Grid>
        </Container>
    </Paper>
    )
}