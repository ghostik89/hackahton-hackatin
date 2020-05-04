import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';


export const ListClass = props => {

    return (
        <List>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <AssistantPhotoIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.user[0]["name"]} secondary="Название группы" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <LocationCityIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.user[0]["city"]} secondary="Город" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <AccountBalanceIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={props.user[0]["educationalInstitution"]} secondary="Место учебы" />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <AssignmentTurnedInIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${props.user[0]["classNumber"]} ${props.user[0]["literal"]}`} secondary="Класс" />
            </ListItem>
        </List>
    );
}
