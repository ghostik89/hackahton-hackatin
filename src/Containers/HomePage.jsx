import Typography from '@material-ui/core/Typography';
import React from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import FunctionsIcon from '@material-ui/icons/Functions';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginBottom: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        width: '100%',
        minHeight: '200px',
        backgroundColor: '#F3D516'
    }
}));

export const HomePage = ({history}) => {
    const classes = useStyles()
    return(
        <div>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item xs={3}>
                        <FunctionsIcon/>
                    </Grid>
                    <Grid item xs={9}>
                        <Typography>Арифметика</Typography>
                    </Grid>
                </Grid>
                <Typography>Выбери свой уровень</Typography>
            </Paper>
            <Container>
                <Paper>
                    <List>
                        <ListItem>
                            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                        </ListItem>
                    </List>
                </Paper>
            </Container>
        </div>
    )
}