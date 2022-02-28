import React from 'react';

export default function useSnackbar() {
  const [snackState, setState] = React.useState({ open: false });
  const say = React.useCallback(
    (text = 'Please enter a value') =>
      new Promise((yes) => {
        setState({
          open: true,
          children: text,
          onClose: () => {
            setState({ open: false });
            yes(false);
          },
        });

        setTimeout(() => {
          setState({ open: false });
        }, 2999);
      }),
    []
  );
  return { snackState, say };
}
