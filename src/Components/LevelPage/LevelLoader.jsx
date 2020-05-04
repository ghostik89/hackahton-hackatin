import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

export const LevelLoader = () => {
    return (
        <Container>
            <Skeleton variant="rect" width={210} height={118} animation="wave" />
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={3}
            >
                <Skeleton variant="rect" width={210} height={118} animation="wave" />
                <Skeleton variant="rect" width={210} height={118} animation="wave" />
                <Skeleton variant="rect" width={210} height={118} animation="wave" />
                <Skeleton variant="rect" width={210} height={118} animation="wave" />
            </Grid>
        </Container>
    );
}
