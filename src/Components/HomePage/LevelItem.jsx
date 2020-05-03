import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

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
                        <ListItem key={elem["id"]} button className={classes.nested}>
                            <ListItemText primary={elem["name"]} />
                        </ListItem>))}
                </List>
            </Collapse>
        </div>
    )
}