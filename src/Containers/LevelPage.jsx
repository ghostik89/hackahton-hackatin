import React, {useEffect, useState} from "react";
import {useAuth} from "../Context/auth";
import {useParams} from "react-router";
import {BASE_URL} from "../constants/RequestConstants";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import blueGrey from "@material-ui/core/colors/blueGrey";
import HomeIcon from '@material-ui/icons/Home';
import {Answers} from "../Components/LevelPage/Answers";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
    beginButton:{
        backgroundColor:'#F3D516',
        color:'#000',
        width:'100%',
        '&:hover, &$focusVisible':{
            backgroundColor:'#d2ba1a',
        },
    },
    beginPaper:{
        color: theme.palette.text.secondary,
        padding: theme.spacing(5),
        marginBottom: theme.spacing(6),
        marginTop:theme.spacing(3),
        textAlign: 'center',
        minHeight: '300px'
    },
    exPaper:{
        color:'#000',
        backgroundColor:'#F3D516',
        padding: theme.spacing(5),
        marginBottom: theme.spacing(6),
        marginTop:theme.spacing(3),
        textAlign: 'center',
        minHeight: '150px'
    }
}))



export const LevelPage = ({history}) => {
    const classes = useStyles()

    const {authTokens} = useAuth()
    const {levelId, name} = useParams()
    const [steps, setSteps] = useState([])
    const [currentStep, setCurrentStep] = useState(0)
    const [loader, setLoader] = useState(true)
    const [begin, setBegin] = useState(false)
    const [beginDate, setBeginDate] = useState(new Date())
    const [allAnswers, setAllAnswers] = useState([])
    const [wrongAnswers, setWrongAnswers] = useState([])

    useEffect(() => {
            fetch(`${BASE_URL}api/exercise/${levelId}`,{
            method:'GET',
            headers: new Headers({
                "Authorization": `Basic ${authTokens.token}`,
                "Content-type": "application/json;charset=utf-8"
            })
        }).then(response => (response.ok ? response.json(): Promise.reject(response))).then(res => {
                setSteps(res)
                setLoader(false)
        }).catch(error => console.log(error))
    },[loader])

    const toHomePage = () =>{
        let data = {
            "answers": allAnswers,
            "dateFinish": new Date(),
            "dateStart": beginDate,
            "levelId": levelId
        }
        fetch(`${BASE_URL}api/level`,{
            method:'POST',
            headers: new Headers({
                "Authorization": `Basic ${authTokens.token}`,
                "Content-type": "application/json;charset=utf-8"
            }),
            body: JSON.stringify(data)
        }).then(response => (response.ok ? '': Promise.reject(response))).then(() => {
            history.push({ pathname: '/home' })
        }).catch(error => console.log(error))
    }

    const resetLevel = () => {
        setBegin(false)
        setAllAnswers([])
        setWrongAnswers([])
        setCurrentStep(0)
        setLoader(true)
    }

    return(
        <div>
            <div>
                <AppBar position="static" color={blueGrey[100]}>
                    <Toolbar>
                        <Typography variant="h6">
                            {name}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Container>
                    <div>
                        {!begin?
                            <div>
                                <Paper elevation={3} className={classes.beginPaper}>
                                    <Typography variant="h4" gutterBottom>Выберите правильный вариант ответа</Typography>
                                </Paper>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Button
                                            disabled={loader}
                                            onClick={() => {
                                                setBegin(true)
                                                setBeginDate(new Date())
                                            }}
                                            className={classes.beginButton}
                                        >
                                            Начать
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            className={classes.beginButton}
                                            onClick={() =>{history.push({ pathname: '/home' })}}
                                        >
                                            <HomeIcon />
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div> :
                            <div>
                                {currentStep < steps.length?
                                    <div>
                                        <Paper elevation={3} className={classes.exPaper}>
                                            <Typography variant="h1" component="h2"
                                                        gutterBottom>{steps[currentStep]["text"]}</Typography>
                                        </Paper>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography
                                                    variant={"h6"}
                                                    align={'left'}
                                                    color={"secondary"}
                                                >
                                                    {`ошибок ${wrongAnswers.length}`}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography
                                                    variant={"h6"}
                                                    align={'right'}
                                                    color={"primary"}
                                                >
                                                    {`сделано ${currentStep} из ${steps.length}`}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Answers
                                            answers={steps[currentStep]["answers"]}
                                            toNextLevel={() => setCurrentStep(currentStep + 1)}
                                            addWorngAnswers={ answer => {
                                                let tempArr = wrongAnswers
                                                tempArr.push(`${steps[currentStep]["text"]} ≠ ${answer}`)
                                                setWrongAnswers(tempArr)}}
                                            addAnswer={answerId => {
                                                let tempArr = allAnswers
                                                tempArr.push(answerId)
                                                setAllAnswers(tempArr)
                                            }}
                                        />
                                    </div>:<div>
                                        <Paper elevation={3} className={classes.beginPaper}>
                                            {wrongAnswers.length === 0?<>
                                                <SentimentVerySatisfiedIcon color={"primary"}/>
                                                <Typography>
                                                    Молодец! Все верно
                                                </Typography></>:<>
                                                <SentimentVeryDissatisfiedIcon/>
                                                <Typography variant={"h6"}>
                                                    {`Сделано ${wrongAnswers.length} ошибок из ${steps.length}`}
                                                </Typography>
                                                {wrongAnswers.map(elem => (
                                                <Typography variant={"h6"}>
                                                    {elem}
                                                </Typography>))}</>}
                                        </Paper>
                                        {wrongAnswers.length === 0?
                                                <Button
                                                    className={classes.beginButton}
                                                    onClick={() =>{history.push({ pathname: '/home' })}}>
                                                    Следующий уровень
                                                </Button>:<Grid container spacing={3}>
                                                <Button color={"primary"} onClick={resetLevel}>
                                                    Еще раз
                                                </Button>
                                                <Button
                                                    color={"primary"}
                                                    startIcon={<HomeIcon />}
                                                    onClick={toHomePage}
                                                />
                                            </Grid>}
                                    </div>}
                            </div>}
                    </div>
                </Container>
            </div>
        </div>
    )
}