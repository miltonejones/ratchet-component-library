import React from "react";
import { AppBar, BottomAppBar, IconButton } from "../../../components/UI/UI.js";
import { Hamburger } from "../../../icons";


export default function AppBarStory(args) {
    return (<AppBar {...args} >
    <IconButton  color="secondary" ml={4}>
      <Hamburger />
    </IconButton>
 </AppBar>)
}