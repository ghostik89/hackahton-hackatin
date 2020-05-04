import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import {TableHeader} from "./TableHeader";

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export const TableTrending = props => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(15);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root} elevation={0}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHeader theme={props.theme} dump={props.statistic[0]["themesDto"].filter(elem => elem["name"] === props.theme)}/>
                    <TableBody>
                        {props.statistic.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((elem) => (
                                <TableRow hover tabIndex={-1} key={elem["id"]}>
                                    <TableCell>{elem["userName"]}</TableCell>
                                    {elem["themesDto"].filter(elem => elem["name"] === props.theme)[0]["levels"].map((column) => (
                                        <TableCell key={column.toString()} align={"left"} >
                                            {column["userLevelDto"] === null?  '-':<>
                                                {column["userLevelDto"]? <SentimentVerySatisfiedIcon color={"primary"}/>:
                                                    <SentimentVeryDissatisfiedIcon color={"secondary"} />}
                                            </>}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[15, 20, 25]}
                component="div"
                count={props.statistic.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
