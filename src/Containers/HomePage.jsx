import Typography from '@material-ui/core/Typography';
import React, {useEffect, useState} from "react";
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
    },
    page:{
        paddingTop:'2rem'
    }
}));

export const HomePage = ({history}) => {
    const [levels, setLevels] = useState([])

    useEffect(() => {
        setLevels([{
            levelName:"SomeName",
            description:"description",
            steps:[{
            }]
        },{},{}])
    },[])

    const classes = useStyles()
    return(
        <div>
            <Paper className={classes.paper}>
                <Container className={classes.page}>
                    <Grid container spacing={3}>
                        {/*fixme: not for mobile*/}
                        <FunctionsIcon  style={window.innerWidth <= 760? { fontSize: 65 }: { fontSize: 120 }} />
                        <Typography variant="h1" component="h2" gutterBottom>Арифметика</Typography>
                    </Grid>
                    <Typography  variant="h2" component="h2" gutterBottom>Выбери свой уровень</Typography>
                </Container>
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