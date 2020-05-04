import React, {useState} from "react";
import {useAuth} from "../Context/auth";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {Header} from "../Components/MobileHeader";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ComplexGrid from "../Components/ComplexGrid";
import {HeaderS} from "../Components/Header";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from '@material-ui/icons/Add';
import {ListClass} from "../Components/ListClass";
import {StudentsTable} from "../Components/StudentsTable";
import SearchIcon from '@material-ui/icons/Search';
import {DialogAddGroup} from "../Components/DialogAddGroup";
import {DialogSearchGroup} from "../Components/DialogSearchGroup";

const useStyles = makeStyles((theme) => ({
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
    div:{
        marginBottom: '5rem',
    },
    groupPage:{
        padding: theme.spacing(2)
    },
    fab:{
        padding: theme.spacing(2)
    }
}));

export const AccountPage = ({history}) => {
    const {authTokens} = useAuth()
    const[addGroup, setAddGroup] = useState(false)
    const[searchGroup, setSearchGroup] = useState(false)
    const classes = useStyles()

    const logOut = () => {
        localStorage.clear()
        history.push({ pathname: '/'})
    }

    const updateData = () =>{
        history.push({ pathname: '/'})
    }
    return(
        <div className={classes.div}>
            <HeaderS/>
            <Container>
                <Typography  variant="h2" component="h2" gutterBottom>Аккаунт</Typography>
                <ComplexGrid user = {authTokens.user} logOut={logOut}/>
                <Paper className={classes.groupPage}>
                    <Grid container spacing={3}>
                        <Grid item>
                            <Typography variant={"h4"}>Мой класс</Typography>
                        </Grid>
                        <Grid item>
                            {authTokens.user["classGroupsDto"].length===0?
                                <Tooltip title="Добавить новывй класс" aria-label="add">
                                    <Fab
                                        color="primary"
                                        size="small"
                                        aria-label="add"
                                        className={classes.fab}
                                        onClick={() => setAddGroup(true)}
                                    >
                                        <AddIcon/>
                                    </Fab>
                                </Tooltip> :''}
                        </Grid>
                        <Grid item>
                            {authTokens.user["classGroupsDto"].length===0?
                                <Tooltip title="Найти себе класс" aria-label="add" >
                                    <Fab
                                        color="primary"
                                        size="small"
                                        aria-label="add"
                                        className={classes.fab}
                                        onClick={() => setSearchGroup(true)}
                                    >
                                        <SearchIcon/>
                                    </Fab>
                                </Tooltip> :''}
                        </Grid>
                    </Grid>
                    <Divider/>
                    {authTokens.user["classGroupsDto"].length===0?
                        <>
                            <Typography  variant="body1" color="textSecondary" >Вы не зашли в класс :(</Typography>
                            <Typography  variant="body1" color="textSecondary" >Создайте или найдите свой класс</Typography>
                        </> :<>
                            <ListClass user={authTokens.user["classGroupsDto"]}/>
                            <StudentsTable user={authTokens.user["classGroupsDto"][0]["users"]}/>
                        </>}
                </Paper>
            </Container>
            <Header value={2} history = {history}/>
            <DialogAddGroup
                open={addGroup}
                funcClose={() => setAddGroup(false)}
                updateData={updateData}
            />
            <DialogSearchGroup
                open={searchGroup}
                funcClose={() => setSearchGroup(false)}
                updateData={updateData}
            />
        </div>
    );

};
