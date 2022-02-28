import { addons } from "@storybook/addons";
import yourTheme from "./MyTheme";

addons.setConfig({
  theme: yourTheme,
  isFullscreen: false,
  showNav: true,
  showPanel: true,
  panelPosition: "bottom",
  enableShortcuts: true,
  isToolshown: true,
  initialActive: "sidebar",
  sidebar: {
    showRoots: true,
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
});
