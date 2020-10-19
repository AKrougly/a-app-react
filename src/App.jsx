import React, { useState } from "react";

import { HashRouter } from "react-router-dom";

import Router from "./appcontainer/Router";

import { route as about } from "./appcontainer/pages/about";
import { route as backup } from "./appcontainer/pages/backup";
import { route as dashboard } from "./appcontainer/pages/dashboard";
import { route as help } from "./appcontainer/pages/help";
import { route as settings } from "./appcontainer/pages/settings";
import { route as todolist } from "./appcontainer/pages/todolist";
import { route as getman } from "./appcontainer/pages/agetman";

import { PaletteContext, str2color } from "./usePalette";

function App() {
  const [palette, setPalette] = useState({
    primary: "teal",
    secondary: "teal",
    type: "light"
  });
  const { primary, secondary, type } = palette;
  const setPrimary = color => setPalette({ ...palette, primary: color });
  const setSecondary = color => setPalette({ ...palette, secondary: color });
  const setType = type => setPalette({ ...palette, type });

  return (
    <PaletteContext.Provider
      value={[palette, setPrimary, setSecondary, setType]}
    >
      <Router
        ThemeProps={{
          palette: {
            primary: str2color(primary),
            secondary: str2color(secondary),
            type: type
          }
        }}
        RouterProps={{
          Router: HashRouter,
          routes: [about, backup, dashboard, help, settings, todolist, getman]
        }}
      />
    </PaletteContext.Provider>
  );
}

export default App;
