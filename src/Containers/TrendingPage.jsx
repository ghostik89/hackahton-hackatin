import FunctionsIcon from '@material-ui/icons/Functions';
import {Header} from "../Components/MobileHeader";
import React, {useEffect, useState} from "react";
import {useAuth} from "../Context/auth";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {TableTrending} from "../Components/TrendingPage/TableTrending";
import {ChartTrendig} from "../Components/TrendingPage/ChartTrendig";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import AssistantIcon from '@material-ui/icons/Assistant';
import {HeaderS} from "../Components/Header";
import {BASE_URL} from "../constants/RequestConstants";
import LinearProgress from "@material-ui/core/LinearProgress";



const useStyles = makeStyles((theme) => ({
    root:{
        marginBottom: '5rem'
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
    },
    containers:{
        '& > *': {
            margin: theme.spacing(2)
        }
    },
    formControl:{
        marginTop:theme.spacing(1),
        marginBottom: theme.spacing(1),
        width:'100%'
    },
    paperData:{
        padding: theme.spacing(2)
    }
}));

export const TrendingPage = ({history}) => {
    const {authTokens} = useAuth()
    const classes = useStyles()
    const [age, setAge] = React.useState('');
    const [statistic, setStatistic] = useState([])
    const [loader, setLoader] = useState(true)

    useEffect( ()=>{
        fetch(`${BASE_URL}api/group/statistic/${authTokens.user["classGroupsDto"]["id"]}`,{
            method:'GET',
            headers: new Headers({
                "Authorization": `Basic ${authTokens.token}`,
                "Content-type": "application/json;charset=utf-8"
            })
        }).then(response => (response.ok ? response.json(): Promise.reject(response))).then(res => {
            setStatistic(res)
        }).catch(error => console.log(error))
        setLoader(false)
    },[])

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return(
        <div className={classes.root}>
            <HeaderS/>
            <Container className={classes.containers}>
                <Typography  variant="h2" component="h2" gutterBottom>Статистика</Typography>
                <Paper className={classes.paperData}>
                    <Grid container>
                        <Typography  variant="h6" component="h2" gutterBottom>Топ по пройденым темам</Typography>
                    </Grid>
                    <Divider/>
                    {loader? <LinearProgress/>:<>
                        <TableTrending/>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel id="demo-simple-select-outlined-label">Темы</InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-simple-select-outlined"
                                value={age}
                                onChange={handleChange}
                                label="Темы"
                            >
                                {statistic[0]["themesDto"].map(elem => (
                                    <MenuItem key={elem.toString()} value={elem["name"]}>{elem["name"]}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </>}
                </Paper>
                <Paper className={classes.paperData}>
                    <Typography  variant="h6" component="h2" gutterBottom>Топ по количеству монет</Typography>
                    <Divider/>
                    {loader? <LinearProgress/>:<ChartTrendig/>}
                </Paper>
            </Container>
            <Header value={1} history = {history}/>
        </div>
    );

};
