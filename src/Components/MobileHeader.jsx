import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Paper from "@material-ui/core/Paper";
import HomeIcon from '@material-ui/icons/Home';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const useStyles = makeStyles({
    root: {
        width: '100%',
        position:'fixed',
        left:0,
        bottom:0
    },
    header_bottomAction_selected:{
        color: "#F3558E"
    },

});

export const Header = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return (
        <Paper>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction label="Главная" icon={<HomeIcon />} className={classes.header_bottomAction_selected} />
                <BottomNavigationAction label="Статистика" icon={<TrendingUpIcon />} className={classes.header_bottomAction_selected}/>
                <BottomNavigationAction label="Аккаунт" icon={<AccountBoxIcon />} className={classes.header_bottomAction_selected}/>
            </BottomNavigation>
        </Paper>
    );
}
