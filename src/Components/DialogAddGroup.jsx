import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import {useAuth} from "../Context/auth";
import {BASE_URL} from "../constants/RequestConstants";
import {SnackBar} from "./SnackBar";

export const DialogAddGroup = (props) => {
    const [group, setGroup] = useState({
        "city": "",
        "classNumber": '',
        "educationalInstitution": "",
        "literal": "",
        "name": ""
    })
    const [loader, serLoader] = useState(false)
    const {authTokens} = useAuth()
    const [error, setError] = useState(false)

    const handleClose = () => {
        props.funcClose()
    };

    const pushGroup = () =>{
        serLoader(true)
        fetch(`${BASE_URL}api/group/new`,{
            method:'POST',
            headers: new Headers({
                "Content-type": "application/json;charset=utf-8",
                "Authorization": `Basic ${authTokens.token}`,
            }),
            body: JSON.stringify(group)
        }).then(response => (response.ok ? '': Promise.reject(response))).then(() => {
            serLoader(false)
            props.updateData()
        }).catch(() => setError(true))
    }

    return (
            <div>
                <Dialog open={props.open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <LinearProgress variant={!loader? "determinate":''}/>
                    <DialogTitle id="form-dialog-title">Добавление группы</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Внимание! После добавления группы ваши данные обновятся и вы окажетесь на главной!
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Название группы"
                            variant="outlined"
                            fullWidth
                            onChange={e => setGroup({...group, "name": e.target.value})}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Город"
                            variant="outlined"
                            fullWidth
                            onChange={e => setGroup({...group, "city": e.target.value})}
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            label="Место обучения"
                            variant="outlined"
                            fullWidth
                            onChange={e => setGroup({...group, "educationalInstitution": e.target.value})}
                        />
                        <Grid container spacing={1}>
                            <Grid item>
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    id="name"
                                    label="Цифра класса"
                                    fullWidth
                                    onChange={e => setGroup({...group, "classNumber": e.target.value})}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    margin="dense"
                                    id="name"
                                    label="Буква класса"
                                    variant="outlined"
                                    fullWidth
                                    onChange={e => setGroup({...group, "literal": e.target.value})}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Отмена
                        </Button>
                        <Button onClick={pushGroup} color="primary">
                            Добавить
                        </Button>
                    </DialogActions>
                </Dialog>
                <SnackBar
                    open={error}
                    funcChange={() => setError(false)}
                    severity={"error"}
                    message={"Ошибка при создании группы"}
                />
            </div>
    );
}
