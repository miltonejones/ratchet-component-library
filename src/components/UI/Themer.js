import React from "react";
import cssValues from "./css-values";
import useInspector from "./hooks/useInspector";
import useCollapse from "./hooks/useCollapse";

const THEME_SPACING = 4;

const copy = (a, b) => Object.assign(a, b);

const proper = (value) => (isNaN(value) ? value : `${value * THEME_SPACING}px`);

const css = (o) =>
  Object.keys(o)
    .filter((i) => !!o[i])
    .join(" ");

const convertProps = (props) =>
  ((o) => {
    Object.keys(cssValues)
      .filter((key) => props.hasOwnProperty(key))
      .map((key) => copy(o, { [cssValues[key]]: proper(props[key]) }));
    !!props?.sx && copy(o, props.sx);
    return o;
  })({});

/**
 * ThemeWrapper component enables theme colors and spacing
 * for components that support them
 */
const Tw = ({
  children,
  color = "primary",
  variant = "default",
  size = "small",
  severity,
  disabled,
  checked,
  width,
  height,
  speed = "1s",
}) => {
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
  return <span {...args}>{children}</span>;
};

/**
 * Collapse Wrapper provides a ref to the calling component
 * to measure its contents
 */
const Cw = React.forwardRef(({ children, style, ...props }, ref) => (
  <div ref={ref} style={{ ...convertProps(props), ...style }} {...props}>
    {children}
  </div>
));

export { convertProps, css, Tw, Cw, THEME_SPACING, useInspector, useCollapse };
