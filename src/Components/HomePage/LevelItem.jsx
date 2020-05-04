import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));

export const LevelItem = props => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return(
        <div>
            <ListItem button onClick={handleClick}>
                <ListItemText primary={props.unit["name"]} secondary={props.unit["description"]}/>
                {open ? <ExpandLess color={"primary"}/> : <ExpandMore color={"primary"}/>}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {props.unit["levels"].map(elem => (
                        <ListItem key={elem["id"]}  className={classes.nested}>
                            <ListItemText primary={"Уровень " + elem["levelNumber"]+ ". " +elem["name"]} />
                            <ListItemIcon align={"right"}>

                                <IconButton
                                    color="primary"
                                    aria-label="play arrow"
                                    component="span"
                                    onClick={() => props.goToLevelPage(elem["id"], "Уровень " + elem["levelNumber"]+ ". " +elem["name"])}>
                                    {elem["userLevelDto"] === null?'':((elem["userLevelDto"]["successfullyPassed"] === false) ?
                                        <SentimentVeryDissatisfiedIcon color={"secondary"}/>
                                        : <SentimentVerySatisfiedIcon color={"primary"}/>)}
                                    {elem["userLevelDto"] === null ? <PlayArrowIcon/> : <AutorenewIcon />}
                                </IconButton>

                            </ListItemIcon>
                        </ListItem>))}
                </List>
            </Collapse>
        </div>
    )
}
