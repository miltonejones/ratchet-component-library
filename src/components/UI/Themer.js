import React from "react";
import { css } from "./util";
import cssValues from "./css-values";
import cssColors from "./css-colors";
import useInspector from "./hooks/useInspector";
import useCollapse from "./hooks/useCollapse";
import useThemer from "./useThemer";

const THEME_SPACING = 4;

const copy = (a, b) => Object.assign(a, b);

const proper = (value) => (isNaN(value) ? decolor(value) : `${value * THEME_SPACING}px`);
 
const decolor = value => {
  if (value.indexOf('.') > 0) {
    const parts = value.split('.');
    const opacity = parts[1] / 1000;
    const hexes = cssColors[parts[0]];
    if (hexes) {
      const r = parseInt(hexes.substr(1, 2), 16)
      const g = parseInt(hexes.substr(3, 2), 16)
      const b = parseInt(hexes.substr(5, 2), 16)
      return `rgba(${r}, ${g}, ${b}, ${opacity})`
    }
  }
  return value;
}

const convertProps = (props) =>
  ((o) => {
    Object.keys(cssValues)
      .filter((key) => props.hasOwnProperty(key))
      .map((key) => copy(o, { [cssValues[key]]: proper(props[key]) }));
    !!props?.sx && copy(o, props.sx);
    !!props && console.log(JSON.stringify(props, 0, 2))
    !!props && [props.color||'primary', props.severity].map(hue => {
      !!hue && copy(o, {
        '--text-fore-color': `var(--color-control-back-${hue})`,
        '--text-back-color': `var(--color-text-back-${hue})`,
        '--control-back-color': `var(--color-control-back-${hue})` 
      })
    })
    return {...o, ...props?.style};
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
