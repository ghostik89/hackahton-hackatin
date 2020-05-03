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


export const LevelPage = ({history}) => {
    const {authTokens} = useAuth()
    const {levelId, name} = useParams()
    const [steps, setSteps] = useState([])
    const [currentStep, setCurrentStep] = useState('')

    useEffect(() => {
            fetch(`${BASE_URL}api/exercise/${levelId}`,{
            method:'GET',
            headers: new Headers({
                "Authorization": `Basic ${authTokens.token}`,
                "Content-type": "application/json;charset=utf-8"
            })
        }).then(response => (response.ok ? response.json(): Promise.reject(response))).then(res => {
            setSteps(res)
        }).catch(error => console.log(error))
    },[])
    return(
        <div>
            <AppBar position="static" color={blueGrey[100]}>
                <Toolbar>
                    <Typography variant="h6">
                        {name}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                {steps.length !== 0?
                <div>
                    <Paper>
                        {/*<Typography variant="h1" component="h2" gutterBottom>{steps[currentStep]["text"]}</Typography>*/}
                    </Paper>
                </div>: ''}
            </Container>
        </div>
    )
}