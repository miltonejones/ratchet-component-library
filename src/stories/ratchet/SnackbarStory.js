import React from "react";
import {
  Button,
  Snackbar,
  Center,
  Chip,
  Flex,
  Stack,
} from "../../components/UI/UI.js";

export default function SnackbarStory(args) {
  const [where, setWhere] = React.useState(args.where);
  const [open, setOpen] = React.useState(args.open);
  const wheres = ["nw", "ne", "se", "sw"];
  return (
    <>
      {" "}
      <Snackbar onClose={() => setOpen(!open)} where={where} open={open || args.open}>
        This is the snackbar
      </Snackbar>
      <Center mt={12}>
        <Stack align="center">
          <Flex>
            {wheres.map((w) => (
              <Chip
                onClick={() => setWhere(w)}
                key={w}
                justify="center"
                mt={4}
                ml={1}
                variant={where === w ? "filled" : "outlined"}
              >
                {w}
              </Chip>
            ))}
          </Flex>
          <Button mt={4} variant="outlined" onClick={() => setOpen(!0)}>
            open the snackbar
          </Button>
        </Stack>
      </Center>
    </>
  );
}
