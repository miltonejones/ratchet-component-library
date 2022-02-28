import React from "react";
import { Center, Menu, Button, Box } from "../../components/UI/UI.js";

export default function MenuStory() {
  const options = ["Profile", "My Account", "Log Out"];
  return (
    <Center>
      <Menu
        onChange={(e) => alert(options[e])}
        button={<Button>dashboard</Button>}
        options={options.map((b) => (
          <Box p={1} key={b}>
            {b}
          </Box>
        ))}
      />
    </Center>
  );
}
