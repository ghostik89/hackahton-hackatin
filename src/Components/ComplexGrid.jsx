import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: '100%',
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
}));

export default function ComplexGrid( props ) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <Avatar className={classes.image}>
                            <img className={classes.img} alt="complex" src="https://avatarfiles.alphacoders.com/601/60188.jpg" />
                        </Avatar>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {props.user["userName"]}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                   Ученик
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {"Реальное имя: " + props.user["firstName"] + "" + props.user["lastName"]}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button color={"primary"} style={{ cursor: 'pointer' }} onClick = {props.logOut}>
                                    Выйти
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">{"Коины: " + props.user["points"]}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
