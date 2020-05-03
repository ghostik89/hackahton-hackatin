import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";


export function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="http://visdom.vstu.ru/">
                V.I.S.D.O.M.
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}