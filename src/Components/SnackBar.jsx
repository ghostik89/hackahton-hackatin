import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Slide from "@material-ui/core/Slide";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
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
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                TransitionComponent={SlideTransition}
                open={props.open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={props.severity}>
                    This is a success message!
                </Alert>
            </Snackbar>
    );
}
