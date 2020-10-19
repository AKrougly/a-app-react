import React, { useState } from "react";

import BoxContainer from "../../../BoxContainer";
import NewItem from "../components/NewItem";
import ProgressBar from "../components/ProgressBar";
import ToDoList from "./ToDoList";

export default function Content(props) {
  // String to filter items
  const [filterValue, setFilterValue] = useState("");

  const handleFilter = value => { setFilterValue(value); };
  const handleAddItem = item => { props.addItem(item); };
  const handleChangeItem = item => { props.changeItem(item); };
  const handleImportItems = file => { props.importItems(file); };
  const handleExportItems = () => { props.exportItems(props.items); };
  const handleSendItem = (item, items) => { props.sendItem(item, items); };

  return (
    <BoxContainer>
      <NewItem
        filter={props.filter}
        onChange={handleFilter}
        onEnter={handleAddItem}
        onImport={handleImportItems}
        onExport={handleExportItems}
      />
      <ProgressBar
        showProgressBar={props.showProgressBar}
        items={props.items}
      />
      <ToDoList
        visibilityFilter={props.visibilityFilter}
        filter={props.filter}
        filterValue={props.filter ? filterValue : ""}
        showDeleted={props.showDeleted}
        items={props.items}
        onChange={handleChangeItem}
        onSend={handleSendItem}
      />
    </BoxContainer>
  );
}
