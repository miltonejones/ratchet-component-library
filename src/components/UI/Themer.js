import React from "react";
import { css } from "./util";
import cssValues from "./css-values";
import useInspector from "./hooks/useInspector";
import useCollapse from "./hooks/useCollapse";
import useThemer from "./useThemer";

const THEME_SPACING = 4;

const copy = (a, b) => Object.assign(a, b);

const proper = (value) => (isNaN(value) ? value : `${value * THEME_SPACING}px`);
 

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
const Tw = ({children, ...props}) => {
  const { args } = useThemer(props)
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
