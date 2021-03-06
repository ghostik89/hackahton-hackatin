import Typography from '@material-ui/core/Typography';
import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import FunctionsIcon from '@material-ui/icons/Functions';
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import {LevelItem} from "../Components/HomePage/LevelItem";
import {useAuth} from "../Context/auth";
import {BASE_URL} from "../constants/RequestConstants";
import {Header} from "../Components/MobileHeader";
import mySvg from "../logo.svg";
import {HeaderS} from "../Components/Header";

const useStyles = makeStyles((theme) => ({
    root:{
        marginBottom: '5rem',
    },
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

export const HomePage = ({history}) => {
    const [levels, setLevels] = useState([])
    const {authTokens} = useAuth()
    const classes = useStyles()

    useEffect(() => {
        fetch(`${BASE_URL}api/theme/all`,{
            method:'GET',
            headers: new Headers({
                "Authorization": `Basic ${authTokens.token}`,
                "Content-type": "application/json;charset=utf-8"
            })
        }).then(response => (response.ok ? response.json(): Promise.reject(response))).then(res => {
            setLevels(res)
        }).catch(error => console.log(error))
    },[])

    const goToLevelPage = (levelId, name) => {
        history.push({ pathname: `/level/${levelId}/${name}` })
    }

    return(
        <div>
            <HeaderS/>
            <Container>
                <Typography  variant="h2" component="h2" gutterBottom>Выбери уровень</Typography>
                <Paper>
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        className={classes.list}
                    >
                        {levels.map(elem => <LevelItem key={elem["id"]} unit={elem} goToLevelPage={goToLevelPage}/>)}
                    </List>
                </Paper>
            </Container>
             <Header value={0} history = {history}/>
        </div>
    )
}
