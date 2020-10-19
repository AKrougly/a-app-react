import React, { useState } from "react";

import { useSnackbar } from "notistack";
import clsx from 'clsx';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Button,
  Checkbox,
  // Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  // ListSubheader,
  TextField,
  List,
  Collapse,
} from "@material-ui/core";

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleOutline';
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { HttpMethods } from '../model/consts';
import { SendStatuses } from '../model/consts';

const useStyle = makeStyles((theme) => ({
  Hidden: {
    visibility: "hidden"
  },
  Visible: {
    visibility: "visible"
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 60,
  },
}));

// look: https://stackoverflow.com/questions/62391474/have-two-secondary-action-elements-in-a-list
const ListItemWithWiderSecondaryAction = withStyles({
  secondaryAction: {
    paddingRight: 48
  }
})(ListItem);

export default function ToDoItem({item,  onChange, onSend }) {
  const { name, value, response, error, completed, deleted, sended } = item;

  const [edit, setEdit] = useState(false);
  const [snackbar, setSnackbar] = useState();
  const [expanded, setExpanded] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const classes = useStyle();

  const handleToggle = () => {
    onChange({ ...item, completed: !completed });
  };

  const handleChangeHttpMethod = ({ target: { value } }) => {
    onChange({ ...item, httpMethod: value });
  };

  const handleChangeName = ({ target: { value } }) => {
    onChange({ ...item, name: value });
  };

  const handleChange = ({ target: { value } }) => {
    onChange({ ...item, value });
  };

  const handleSend = () => {
    onSend(item);
  };

  const handleDelete = () => {
    onChange({ ...item, deleted: true });
    const key = enqueueSnackbar("Item deleted", {
      action: (
        <Button color="inherit" onClick={handleUndo}>
          Undo
        </Button>
      )
    });
    setSnackbar(key);
  };

  const handleUndo = () => {
    onChange({ ...item, deleted: false });
    closeSnackbar(snackbar);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // TODO: add title if item is deleted
  return (
    <List>
      <ListItemWithWiderSecondaryAction button>
        <ListItemIcon>
          <Checkbox
            title="Click to toggle"
            checked={completed}
            onClick={handleToggle}
          />
        </ListItemIcon>
        <IconButton onMouseDown={handleSend} title="Send item">
          <PlayCircleFilledIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        <FormControl className={classes.formControl}>
          <InputLabel id="http-method">Http method</InputLabel>
          <Select
            labelId="http-method"
            id="http-method"
            value={item.httpMethod}
            onChange={handleChangeHttpMethod}
          >
            <MenuItem value={HttpMethods.GET}>Get</MenuItem>
            <MenuItem value={HttpMethods.POST}>Post</MenuItem>
            <MenuItem value={HttpMethods.JSON}>Json</MenuItem>
          </Select>
        </FormControl>
        <TextField id={name} value={name} label="name" name="Name" margin="normal" onChange={handleChangeName} />
        {edit ? (
          <TextField
            autoFocus
            fullWidth
            value={value}
            onBlur={() => setEdit(false)}
            onChange={handleChange}
          />
        ) : (
          <ListItemText primary={value.length < 100 ? value : value.slice(0, 96) + ' ...'} onClick={() => setEdit(true)} />
        )}

        {
          // TODO: If deleted:
          // action delete forever
          // action restore
        }
        {deleted ? (
          <ListItemSecondaryAction>
            <DeleteIcon />
          </ListItemSecondaryAction>
        ) : (
          <ListItemSecondaryAction
            className={edit ? classes.Visible : classes.Hidden}
          >
            <IconButton onMouseDown={handleDelete} title="Click to delete">
              <CancelIcon />
            </IconButton>
          </ListItemSecondaryAction>
        )}
      </ListItemWithWiderSecondaryAction>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <TextField fullWidth value={sended === SendStatuses.SEND_FAILURE ? error : response} />
      </Collapse>
    </List>
  );
}
