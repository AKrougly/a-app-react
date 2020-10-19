import React from "react";

import ListIcon from "@material-ui/icons/List";

import Page from "../Page";
import Header from "../Header";
import BackIconButton from "../BackIconButton";
import ProviderReducer from "./agetman/ProviderReducer";

function Component() {
  return (
    <Page
      header={<Header LeftAction={<BackIconButton />}>Request Manager</Header>}
      content={
        <ProviderReducer />
      }
    />
  );
}

export const route = {
  path: "/agetman",
  exact: true,
  component: Component
};

export const drawer = {
  key: "agetman",
  primary: "Request Manager",
  secondary: "",
  icon: <ListIcon />,
  title: "Open Request Manager app"
};
