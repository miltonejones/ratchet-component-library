import React from "react";

export default function useCollapse(height, on) {
  const [openHeight, setOpenHeight] = React.useState(height);
  const ref = React.createRef();
  React.useEffect(() => {
    if (!ref.current) return;
    const { offsetHeight } = ref.current;
    if (offsetHeight < 100) return;
    if (!!height || !offsetHeight || !on) {
      height !== openHeight && setOpenHeight(height);
      return;
    }
    setOpenHeight(offsetHeight + "px");
  }, [ref, on, height, openHeight]);
  const style = { "--open-height": openHeight };
  return { style, ref };
}
