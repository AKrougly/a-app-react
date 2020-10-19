import React, { createRef, useState } from "react";
import {
  IconButton,
  InputAdornment,
  List,
  ListItem,
  TextField
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import UploadFileButton from "./uploadFile/UploadFileButton";
import DownloadStateButton from "./downloadState/DownloadStateButton";

const ref = createRef();

export default function NewItem({
  filter = false,
  onEnter = () => {},
  onChange = () => {},
  onImport = () => {},
  onExport = () => {},
}) {
  const [value, setValue] = useState("");

  const handleAddItem = () => {
    onEnter(value);
    setValue("");
    onChange("");
    ref.current.focus();
  };

  function handleKeyPress({ key }) {
    if (key === "Enter") {
      handleAddItem();
    }
  }

  function handleChange({ target: { value } }) {
    setValue(value);
    onChange(value);
  }

  return (
    <List>
      <ListItem>
        <TextField
          fullWidth
          label="Add an item"
          ref={ref}
          value={value}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  title="Click to add"
                  disabled={filter || !value.trim()}
                  onClick={handleAddItem}
                >
                  <AddCircleIcon />
                </IconButton>
                <UploadFileButton
                  disabled={filter || !!value.trim()}
                  onImport={onImport}
                />
                <DownloadStateButton
                  disabled={filter}
                  onExport={onExport}
                />
              </InputAdornment>
            )
          }}
        />
      </ListItem>
    </List>
  );
}
