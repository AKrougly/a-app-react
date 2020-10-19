import React from "react";

import { useHistory } from "react-router-dom";

import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  // ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  SwipeableDrawer,
  Switch,
  FormControlLabel,
  RadioGroup,
  Radio
} from "@material-ui/core";

// see: https://material-ui.com/ru/api/root-ref/
//Warning: findDOMNode is deprecated in StrictMode...

// see: https://material-ui.com/components/material-icons/
import GitHubIcon from "@material-ui/icons/GitHub";
import InfoIcon from "@material-ui/icons/Info";
import CallToActionIcon from "@material-ui/icons/CallToAction";

const LISTS = [
  // {
  //   header: "ListSubheader",
  //   items: [
  // {type: 'divider'},
  // {type: 'item', title: 'ItemName', href: '/', Icon: IconName}
  // ]
  // }
  {
    items: [
      { type: "item", title: "About", href: "/about", Icon: InfoIcon },
      { type: "item", title: "Calculator", href: "/acalculator", Icon: CallToActionIcon },
      {
        type: "item",
        title: "Github",
        href: "https://github.com/mastro-elfo/todo-react",
        Icon: GitHubIcon
      },
    ]
  }
];

const LARGER = false;

export default function Drawer({
  showProgressBar, toggleShowProgressBar,
  visibilityFilter, setVisibilityFilter,
  filter, toggleFilter,
  showDeleted, toggleShowDeleted,
  open, onClose, onOpen
}) {
  function handleShowProgressBar() {
    toggleShowProgressBar();
  }

  function handleRadioChange(event) {
    setVisibilityFilter(event.target.value);
  }

  function handleFilter() {
    toggleFilter();
  }

  function handleShowDeleted() {
    toggleShowDeleted();
  }

  return (
    <SwipeableDrawer open={open} onClose={onClose} onOpen={onOpen}>
      <List subheader={<ListSubheader>Preferences</ListSubheader>}>
        <ListItem alignItems="center" button>
          <ListItemText primary="" />
          <RadioGroup aria-label="View" name="View111" value={visibilityFilter} onChange={handleRadioChange}>
            <FormControlLabel value="SHOW_ALL" control={<Radio />} label="All" />
            <FormControlLabel value="SHOW_ACTIVE" control={<Radio />} label="Active" />
            <FormControlLabel value="SHOW_COMPLETED" control={<Radio />} label="Completed" />
          </RadioGroup>
        </ListItem>
        <ListItem button onClick={handleFilter}>
          <ListItemIcon>
            <Switch checked={filter} />
          </ListItemIcon>
          <ListItemText primary="Filter" secondary={filter ? "On" : "Off"} />
        </ListItem>
        <ListItem button onClick={handleShowDeleted}>
          <ListItemIcon>
            <Switch checked={showDeleted} />
          </ListItemIcon>
          <ListItemText
            primary="Show deleted"
            secondary={showDeleted ? "On" : "Off"}
          />
        </ListItem>
        <ListItem button onClick={handleShowProgressBar}>
          <ListItemIcon>
            <Switch checked={showProgressBar} />
          </ListItemIcon>
          <ListItemText
            primary="Progress"
            secondary={showProgressBar ? "On" : "Off"}
          />
        </ListItem>
      </List>

      {LISTS.map(({ header, items }, listIndex) => (
        <List
          key={listIndex}
          subheader={<ListSubheader>{header}</ListSubheader>}
        >
          {items.map((item, itemIndex) => (
            <DrawerItem key={itemIndex} {...item} />
          ))}
        </List>
      ))}
    </SwipeableDrawer>
  );
}

const DrawerItem = ({ type, title, href, Icon }) => {
  const { push } = useHistory();

  if (type === "divider") {
    return <Divider />;
  } else if (type === "item") {
    const isLink = !!href;
    const isExternal = isLink && href.startsWith("http");
    return (
      <ListItem
        button={isLink}
        title={title}
        onClick={
          isExternal
            ? () => window.open(href)
            : isLink
            ? () => push(href)
            : null
        }
      >
        {!!Icon && (
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
        )}
        <ListItemText primary={title} />
        {LARGER && (
          <ListItemIcon>
            <span />
          </ListItemIcon>
        )}
      </ListItem>
    );
  }
  return (
    <ListItem>
      <ListItemText primary={type} secondary="Unknown type" />
    </ListItem>
  );
};
