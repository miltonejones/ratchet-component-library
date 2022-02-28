import React from "react";
import { Center, Typography, Divider, Stack } from "../../components/UI/UI.js";

export default function DialogStory() {
  return (
    <Center>
      <Stack>
        <Typography variant="h2">Coming soon</Typography>
        <Divider />
        <Typography variant="body1">
          Working on this component. Please come back later.
        </Typography>
      </Stack>
    </Center>
  );
}
