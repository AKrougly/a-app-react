import React from "react";
import { Box, Typography } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";

import Page from "../Page";
import Header from "../Header";
import Content from "../Content";
import BackIconButton from "../BackIconButton";

function Component() {
  return (
    <Page
      header={<Header LeftAction={<BackIconButton />}>Help</Header>}
      content={
        <Content>
          <QA
            question="The app forgets the colors I choosed"
            answer="This is only a demo app, and the color picker is only for
            demostration purpose."
          />
        </Content>
      }
    />
  );
}

function QA({ question, answer }) {
  return (
    <Box>
      <Typography variant="h6">{question}</Typography>
      <Typography color="textSecondary" paragraph>
        {answer}
      </Typography>
    </Box>
  );
}

export const route = {
  path: "/help",
  exact: true,
  component: Component
};

export const drawer = {
  key: "help",
  primary: "Help",
  secondary: "",
  icon: <HelpIcon />,
  title: "How to"
};
