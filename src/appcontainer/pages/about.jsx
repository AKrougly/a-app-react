import React from "react";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography
} from "@material-ui/core";

import Page from "../Page";
import Header from "../Header";
import Content from "../Content";
import BackIconButton from "../BackIconButton";
import NestedListTypography from "../NestedListTypography";

import LogoIcon from "../assets/Logo";
import { version } from "../version";

const list = [
  {
    version: "1.1.0",
    subheader: "12 October 2020",
    list: [
      "Update `mastro-elfo-mui` to version 1.8.0",
      ["Fix bug with `ResultList`"],
      "Add primary or secondary to color picker title",
      'Fix date pages/about: like "20 September 2020"',
      "Fix settings background color in color picker",
      "Fix `.gitignore` `todo* > todo.md`"
    ]
  },
  {
    version: "1.0.0",
    subheader: "10 October 2020",
    list: ["First deploy", "ToDo List App"]
  }
];

function Component() {
  return (
    <Page
      header={<Header LeftAction={<BackIconButton />}>About Demosaur</Header>}
      content={
        <Content>
          <AppCard />
          {list.map((item, i) => (
            <VersionCard key={i} {...item} />
          ))}
        </Content>
      }
    />
  );
}

export const route = {
  path: "/about",
  exact: true,
  component: Component
};

export const drawer = {
  key: "about",
  primary: "Demosaur",
  secondary: `v${version}`,
  title: "About Demosaur",
  icon: <LogoIcon />
};

function AppCard() {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <LogoIcon />
          </Avatar>
        }
        title="Demosaur"
        subheader={`v${version}`}
      />
      <CardContent>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Demo app
        </Typography>

        <Typography variant="h6" gutterBottom>
          MIT license
        </Typography>

        <Typography variant="h6">Software development</Typography>
        <Typography variant="subtitle1" color="textSecondary" gutterBottom>
          Francesco Michienzi
        </Typography>
      </CardContent>
    </Card>
  );
}

function VersionCard({ version, subheader = "", list = [] }) {
  return (
    <Box mt={2}>
      <Card>
        <CardHeader title={`Version ${version}`} subheader={subheader} />
        <CardContent>
          <NestedListTypography>{list}</NestedListTypography>
        </CardContent>
      </Card>
    </Box>
  );
}
