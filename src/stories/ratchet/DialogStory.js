import React from "react";
import {
  Button,
  Dialog,
  Center,
  Typography,
  Divider,
  Stack,
  Flex,
  Spacer,
} from "../../components/UI/UI.js";

export default function DialogStory(args) {
  const [open, setOpen] = React.useState(args.open);
  return (
    <Center mt={12}>
      <Dialog onClose={() => setOpen(!open)} open={open || args.open} >
        <Stack>
          <Typography variant="h2">Some stuff in here</Typography>
          <Divider />
          <Typography variant="body1">Even more in here</Typography>
          <Flex mt={16}>
            <Spacer />
            <Button variant="outlined" mr={2} onClick={() => setOpen(!1)}>Cancel</Button>
            <Button variant="filled">Okay</Button>
          </Flex>
        </Stack>
      </Dialog>
      <Button variant="outlined" onClick={() => setOpen(!0)}>
        open the dialog
      </Button> 
    </Center>
  );
}
