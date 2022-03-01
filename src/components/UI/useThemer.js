import React from "react";
import { css } from "./util";

export default function useThemer ({ 
    color = "primary",
    variant = "filled",
    size = "small",
    severity,
    disabled,
    checked,
    width,
    height,
    speed = "1s",
  }) {
    
  const backgroundColor = {
    outlined: "transparent",
    filled: `var(--back-color-${color})`,
  };
  const foregroundColor = {
    outlined: `var(--color-${color})`,
    filled: "white",
  };
  const borderColor = {
    outlined: `var(--color-${color})`,
    filled: "transparent",
  };
  const borderWidth = {
    outlined: "1px",
    filled: 0,
  };
  const borderStyle = {
    outlined: "solid",
    filled: null,
  };
  const controlSizes = {
    small: "24px",
    medium: "32px",
    large: "48px",
    xl: "64px",
  };
  const controlRadius = {
    square: 0,
    rounded: "4px",
    circle: "50%",
  };

  const radiusCss = !controlRadius[variant]
    ? {}
    : { "--border-radius": controlRadius[variant] };
  const offColor = "rgba(0, 0, 0, 0.4)";
  const backColor = !!severity
    ? `var(--back-color-${severity})`
    : backgroundColor[variant];
  const foreColor = !!severity
    ? `var(--color-${severity})`
    : foregroundColor[variant];
  // const minHeight = !size
  //   ? { '--min-height': 0, '--min-width': 0 }
  //   : { '--min-height': size, '--min-width': size };
  const style = {
    "--border-color": disabled ? offColor : borderColor[variant],
    "--fore-color": disabled ? offColor : foreColor,
    "--back-color": disabled ? offColor : backColor,
    "--control-back-color": disabled ? offColor : `var(--color-control-back-${color})`,
    "--dialog-width": width,
    "--dialog-height": height,
    "--border-width": borderWidth[variant],
    "--animation-speed": speed,
    "--border-style": borderStyle[variant],
    "--control-size": controlSizes[size],
    opacity: disabled ? 0.2 : 1,
    // ...minHeight,
    // width,
    ...radiusCss,
  };
  const args = {
    style,
    className: css({ "ui-disabled": disabled, "ui-checked": checked }),
  };

  return { args }
}