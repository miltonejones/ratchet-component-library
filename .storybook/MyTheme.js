import { create } from "@storybook/theming";
import { version, title, repository } from "../package.json";

const br_tag = "<br>";
const code_tag_open = "<code>";
const code_tag_close = "</code>";
const small_tag_open = "<small>";
const small_tag_close = "</small>";

export default create({
  base: "light",

  colorPrimary: "rebeccapurple",
  colorSecondary: "deepskyblue",

  // UI
  appBg: "white",
  appContentBg: "white",
  appBorderColor: "#2277AA",
  appBorderRadius: 4,

  // Typography
  fontBase: 'Roboto, "Open Sans", sans-serif',
  fontCode: "monospace",

  // Text colors
  textColor: "#222222",
  textInverseColor: "rgba(55,55,55,0.9)",

  // Toolbar default and active colors
  barTextColor: "white",
  barSelectedColor: "gold",
  barBg: "rebeccapurple",

  // Form colors
  inputBg: "white",
  inputBorder: "silver",
  inputTextColor: "black",
  inputBorderRadius: 4,

  brandTitle: `${title}
  ${code_tag_open}
    v${version}
  ${code_tag_close}
  ${br_tag}
  ${small_tag_open}
  (view on GitHub)
${small_tag_close}`,
  brandUrl: `${repository}`,
  // brandImage: "https://place-hold.it/350x150",
});
