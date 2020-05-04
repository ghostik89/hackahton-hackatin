import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import LinearProgress from "@material-ui/core/LinearProgress";
import {useAuth} from "../Context/auth";
import {BASE_URL} from "../constants/RequestConstants";
import Skeleton from "@material-ui/lab/Skeleton";
import {SnackBar} from "./SnackBar";

export const DialogSearchGroup = props => {
    const [groups, setGroups] = useState([])
    const [error, setError] = useState(false)
    const [currentGroup, setCurrentGroup] = useState({})
    const [loader, setLoader] = useState(true)
    const {authTokens} = useAuth()

    useEffect(() => {
        setLoader(true)
        fetch(`${BASE_URL}api/group/all`,{
            method:'GET',
            headers: new Headers({
                "Authorization": `Basic ${authTokens.token}`,
                "Content-type": "application/json;charset=utf-8"
            })
        }).then(response => (response.ok ? response.json(): Promise.reject(response))).then(res => {
            setGroups(res)
            setCurrentGroup(res[0]["id"])
            setLoader(false)
        }).catch(() => setGroups([]))
    },[])

    const handleClose = () => {
        props.funcClose()
    };

    const pushToGroup = () =>{
        setLoader(true)
        fetch(`${BASE_URL}api/group/join/${currentGroup}`,{
            method:'s',
            headers: new Headers({
                "Authorization": `Basic ${authTokens.token}`,
                "Content-type": "application/json;charset=utf-8"
            })
        }).then(response => (response.ok ? '': Promise.reject(response))).then(() => {
            setLoader(false)
            props.updateData()
        }).catch(() => {
            setError(true)
            setLoader(false)
        })
    }

    const handleChange = (event) => {
        setCurrentGroup(event.target.value);
    };

    return (
        <div>
            <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <LinearProgress variant={!loader? "determinate":''}/>
                <DialogTitle id="form-dialog-title">Найти и присоединится к группе</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Внимание! После добавления группы ваши данные обновятся и вы окажетесь на главной!
                    </DialogContentText>
                    {loader? <Skeleton variant="text" width={`100%`} animation="wave"/>:
                        <FormControl variant="outlined" style={{width: '100%'}}>
                        <InputLabel id="demo-simple-select-outlined-label">Группы</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={currentGroup}
                            onChange={handleChange}
                            label="Группы"
                        >
                            {groups.map(elem => (
                                <MenuItem key={elem["id"]} value={elem["id"]}>{elem["name"]}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={pushToGroup} color="primary">
                        Присоединится
                    </Button>
                </DialogActions>
            </Dialog>
            <SnackBar
                open={error}
                funcChange={() => setError(false)}
                severity={"error"}
                message={"Ошибка при присоединению к группе"}
            />
        </div>
    );
}
