import React from 'react';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Paper from "@material-ui/core/Paper";
import HomeIcon from '@material-ui/icons/Home';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    root: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
    },
    header_bottomAction_selected:{
        color: "#F3558E"
    },

});

export const Header = props => {
    const classes = useStyles();
    //todo: add redirect to other pages

    const toHome = e =>{
        e.preventDefault()
        props.history.push({ pathname: '/home' })
    };

    const toTrending = e =>{
        e.preventDefault()
        props.history.push({ pathname: '/trending' })
    };

    const toAccount = e =>{
        e.preventDefault()
        props.history.push({ pathname: '/account' })
    };

    return (
        <Paper>
            <BottomNavigation
                value={props.value}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction label="Главная" icon={<HomeIcon />} className={classes.header_bottomAction_selected} onClick = {toHome}/>
                <BottomNavigationAction label="Статистика" icon={<TrendingUpIcon />} className={classes.header_bottomAction_selected} onClick = {toTrending}/>
                <BottomNavigationAction label="Аккаунт" icon={<AccountBoxIcon />} className={classes.header_bottomAction_selected} onClick = {toAccount}/>
            </BottomNavigation>
        </Paper>
    );
}
