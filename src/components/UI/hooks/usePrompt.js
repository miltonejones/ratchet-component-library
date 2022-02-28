import React from 'react';
import { Flex, Box, TextBox, Button, Divider } from '../UI';

function PromptBody({ text, defaultValue, onClick }) {
  const [value, setValue] = React.useState(defaultValue);
  return (
    <>
      <Flex column>
        <Box mb={4} mt={4}>
          {text}:
        </Box>
        <Box>
          <TextBox value={value} onChange={(e) => setValue(e.target.value)} />
        </Box>
        <Divider />
        <Flex align="center">
          <Button
            onClick={() => onClick(false)}
            color="error"
            variant="outlined"
          >
            Cancel
          </Button>
          <Button ml={2} onClick={() => onClick(value)} variant="filled">
            Okay
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

export default function usePrompt() {
  const [state, setState] = React.useState({ open: false });
  const Prompt = React.useCallback(
    (text = 'Please enter a value', value) =>
      new Promise((yes) => {
        setState({
          open: true,
          value,
          height: '160px',
          children: (
            <PromptBody
              text={text}
              defaultValue={value}
              onClick={(q) => {
                setState({ open: false });
                yes(q);
              }}
            />
          ),

          onClose: () => {
            setState({ open: false });
            yes(false);
          },
        });
      }),
    []
  );
  return { state, Prompt };
}
