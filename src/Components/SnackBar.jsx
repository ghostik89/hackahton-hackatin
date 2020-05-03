import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const SnackBar = props => {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        props.funcClose()
    };

    return (
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={props.open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={props.severity}>
                    {props.message}
                </Alert>
            </Snackbar>
    );
}
