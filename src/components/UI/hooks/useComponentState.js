import React from 'react';

export default function useComponentState(initialState = {}) {
  const [state, setState_] = React.useState(initialState);
  const setState = (n, v) => setState_((s) => ({ ...s, [n]: v }));
  const toggle = (n) => setState_((s) => ({ ...s, [n]: !s[n] }));
  return { state, setState, toggle };
}
