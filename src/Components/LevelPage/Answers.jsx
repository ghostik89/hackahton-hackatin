import React from "react";
import Paper from "@material-ui/core/Paper";
import ButtonBase from "@material-ui/core/ButtonBase";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
    buttonBase:{
        width:'100%',
        minHeight:'4rem',
        textAlign: "center"
    },
    paper:{
        width:'100%',
        minHeight:'4rem'
    }
}))

export const Answers = props => {
    const classes = useStyles()

    const answerChecker = (e, element) => {
        if(!element["isCorrect"]){
            props.addWorngAnswers(element["text"])
        }
        props.addAnswer(element["id"])
        props.toNextLevel()
    }

    return(
        <Grid container spacing={3}>
            {props.answers.map(elem => (
                <Grid item xs={6} key={elem["id"]}>
                    <Paper className={classes.paper} elevation={3}>
                        <ButtonBase
                            focusRipple
                            className={classes.buttonBase}
                            onClick={e => answerChecker(e, elem)}
                        >
                            <Typography variant={"h6"} color={"primary"}>
                                {elem["text"]}
                            </Typography>
                        </ButtonBase>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    )
}