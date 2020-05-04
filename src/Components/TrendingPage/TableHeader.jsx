import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import React from "react";


export const TableHeader = props =>{
    return(
        <TableHead>
            <TableRow>
                <TableCell>Nickname</TableCell>
                {props.dump[0]["levels"].map(elem => (
                    <TableCell>{elem["name"]}</TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}