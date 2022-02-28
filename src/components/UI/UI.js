import React from "react";
import "./UI.css";
import {
  convertProps,
  css,
  Tw,
  Cw,
  THEME_SPACING,
  useInspector,
  useCollapse,
} from "./Themer";
import useComponentState from "./hooks/useComponentState";
import { AlertCircle, CheckCircle, AlertTriangle, Info } from "../../icons";

/****************************************************************************************************
 *                                          RACHET UI
 *                            a component library for the rest of us
 ****************************************************************************************************/

/****************************************************************************************************
 *                                            Alert
 ****************************************************************************************************/
export function Alert({ children, severity = "info", icon: Photo, ...props }) {
  const icons = {
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
    error: AlertCircle,
  };
  const filters = {
    info: "invert(0.5) sepia(1) saturate(5) hue-rotate(175deg)",
    success: "invert(0.5) sepia(.4) saturate(5) hue-rotate(75deg)",
    warning: "invert(0.5) sepia(.8) saturate(5) hue-rotate(15deg)",
    error: "invert(0.2) sepia(.7) saturate(12) hue-rotate(0deg)",
  };
  const Icon = Photo || icons[severity];
  const filter = filters[severity];
  return (
    <Iw {...props} severity={severity}>
      <Box
        style={{
          ...convertProps(props),
          display: "flex",
          alignItems: "center",
        }}
        {...props}
        className="alert"
      >
        <Icon style={{ marginRight: 12, filter }} />
        {children}
      </Box>
    </Iw>
  );
}

/****************************************************************************************************
 *                                           Avatar
 ****************************************************************************************************/
export function Avatar({ children, src, alt, variant = "circle", ...props }) {
  const image = <img src={src} alt={alt} />;
  return (
    <Center className="ui ui-size avatar" variant={variant} {...props}>
      {!!src ? image : children}
    </Center>
  );
}

/****************************************************************************************************
 *                                           Backdrop
 ****************************************************************************************************/
export function Backdrop({ open, onClose: onClick, children, ...props }) {
  const args = { onClick, className: css({ backdrop: 1, open }) };
  return (
    <Center {...args} {...props}>
      {children}
    </Center>
  );
}

/****************************************************************************************************
 *                                            Button
 ****************************************************************************************************/
export function Button({ children, onClick, ...props }) {
  return (
    <Iw {...props}>
      <Center
        {...props}
        className="ui button"
        style={{ ...convertProps(props) }}
        onClick={(e) => !props.disabled && onClick && onClick(e)}
      >
        {children}
      </Center>
    </Iw>
  );
}

/****************************************************************************************************
 *                                    Box (suprisingly useful)
 ****************************************************************************************************/
export function Box({ children, ...props }) {
  return (
    <div style={convertProps(props)} {...props}>
      {children}
    </div>
  );
}

/****************************************************************************************************
 * Card
 * uses a FIELDSET tag to allow for fancy labels
 ****************************************************************************************************/
export function Card({ children, style, ...props }) {
  return (
    <Iw {...props}>
      <fieldset
        {...props}
        className="card"
        style={{ ...style, ...convertProps(props) }}
      >
        {children}
      </fieldset>
    </Iw>
  );
}

/****************************************************************************************************
 *                                           Center
 ****************************************************************************************************/
export function Center({ children, ...props }) {
  return (
    <Flex justify="center" align="center" {...props}>
      {children}
    </Flex>
  );
}

/****************************************************************************************************
 *                                            Chip
 ****************************************************************************************************/
export function Chip({ children, icon, ...props }) {
  return (
    <Flex {...props} className="ui chip" style={convertProps(props)}>
      {!!icon && <Box>{icon}</Box>}
      {children}
    </Flex>
  );
}

/****************************************************************************************************
 *                                          Collapse
 ****************************************************************************************************/
export function Collapse({
  height,
  on,
  children,
  noscroll,
  className,
  ...props
}) {
  const { ref, style } = useCollapse(height, on);
  const styleName = css({ collapse: 1, on, [className]: 1, noscroll });
  return (
    <Iw {...props}>
      <Cw ref={ref} style={style}>
        <div className={styleName} {...props}>
          {children}
        </div>
      </Cw>
    </Iw>
  );
}

/****************************************************************************************************
 *                                           Dialog
 ****************************************************************************************************/
export function Dialog({
  children,
  open,
  onClose,
  width = "400px",
  height = "200px",
  ...props
}) {
  return (
    <Iw {...props} width={width} height={height}>
      <Backdrop open={open} onClose={onClose} />
      <Box className={css({ dialog: 1, open })} {...props}>
        {children}
      </Box>
    </Iw>
  );
}

/****************************************************************************************************
 *                                         Divider
 ****************************************************************************************************/
export function Divider(props) {
  return <hr className="divider" {...props} />;
}

/****************************************************************************************************
 * Flex
 * multi-purpose little div-box, very useful
 ****************************************************************************************************/
export function Flex({
  justify: justifyContent,
  align: alignItems,
  xs,
  spacing = 0,
  style,
  wrap,
  column,
  children,
  ...props
}) {
  const width = !!xs ? `${(xs / 12) * 100}%` : null;
  const flexWrap = wrap ? "wrap" : "nowrap";
  const margin = spacing * THEME_SPACING + "px";
  const flexDirection = column ? "column" : "row";
  const styles = {
    display: "flex",
    flexDirection,
    justifyContent,
    alignItems,
    width,
    margin,
    flexWrap,
    ...style,
    ...convertProps(props),
  };
  return (
    <Iw {...props} width={width}>
      <div
        className={css({ "ui-text": 1, flex: 1, [props.className]: 1 })}
        {...props}
        style={styles}
      >
        {children}
      </div>
    </Iw>
  );
}

/****************************************************************************************************
 * Frame
 * div that acts like an IFrame
 ****************************************************************************************************/
export function Frame({ offset = 0, children, ...props }) {
  const [height, setHeight] = React.useState(null);
  const ref = React.createRef();
  React.useEffect(() => {
    const { offsetTop } = ref.current;
    !!offsetTop && setHeight(`calc(100vh - ${offsetTop}px - ${offset}px)`);
  }, [ref]);
  return (
    <Iw {...props}>
      <Cw {...props} style={{ height }} className="frame" ref={ref}>
        {children}
      </Cw>
    </Iw>
  );
}

/****************************************************************************************************
 *                                Grid (still working on this one)
 ****************************************************************************************************/
export function Grid({ columns, children, ...props }) {
  if (!children) return <i />;
  const width = `calc(${(1 / columns) * 100}% - 6px)`;
  return (
    <div className="grid" {...props} style={convertProps(props)}>
      {children.map((c, i) => (
        <div className="cell" key={i} style={{ width }}>
          [[{c}]]
        </div>
      ))}
    </div>
  );
}

/****************************************************************************************************
 * IconButton
 * a circle with an onClick event...whew that's a toughie
 ****************************************************************************************************/
export function IconButton({ children, onClick, size = "medium", ...props }) {
  return (
    <Flex
      onClick={(e) => !props.disabled && onClick && onClick(e)}
      justify="center"
      align="center"
      className="ui ui-size icon-button"
      {...props}
      size={size}
      style={{ ...convertProps(props) }}
    >
      {children}
    </Flex>
  );
}

/****************************************************************************************************
 * Inspector
 ****************************************************************************************************/
export function Inspector({ children, ...props }) {
  const { open, setOpen, shown, ref, stats, style } = useInspector();
  const onClose = () => setOpen(!1);
  const dialogProps = { onClose, open, width: "400px", height: "500px" };
  return (
    <>
      <Cw {...props} style={style} className="inspector" ref={ref}>
        {children}
        <Box onClick={() => setOpen(!open)} className="stats">
          {stats}
        </Box>
      </Cw>
      <Dialog {...dialogProps}>
        <InspectorBody {...shown} />
      </Dialog>
    </>
  );
}

/****************************************************************************************************
 *                                            List
 ****************************************************************************************************/
export function List({ items, children, dense, header, footer, ...props }) {
  return (
    <ul
      className={css({ list: 1, dense })}
      {...props}
      style={convertProps(props)}
    >
      {!!header && <li>{header}</li>}
      {items?.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
      {children}
      {!!footer && <li>{footer}</li>}
    </ul>
  );
}

/****************************************************************************************************
 *                                            Menu
 ****************************************************************************************************/
export function Menu({ options = [], onChange, button }) {
  const ref = React.createRef();
  const box = React.useRef(null);
  const [coords, setCoords] = React.useState(null);
  const { offsetHeight: menuHeight } = box.current ?? {};
  const { offsetLeft: x, offsetTop: y, offsetHeight: h } = ref.current ?? {};
  const onClick = () =>
    !!ref.current && setCoords({ left: x + "px", top: y + h + "px" });
  const style = { "--menu-content-height": menuHeight + "px" };
  return (
    <>
      <Backdrop open={!!coords} onClose={() => setCoords(null)} />
      <span style={style}>
        <Cw ref={ref} onClick={onClick} className="menu-button">
          {button}
        </Cw>
        <Box className={css({ menu: 1, open: !!coords })} style={coords}>
          <Cw ref={box}>
            <List
              dense
              items={options.map((o, i) => (
                <Box
                  key={i}
                  onClick={() => onChange && onChange(i)}
                  className="menu-item"
                >
                  {o}
                </Box>
              ))}
            />
          </Cw>
        </Box>
      </span>
    </>
  );
}

/****************************************************************************************************
 *                                            Select
 ****************************************************************************************************/
export function Select({ options = [], value, label, ...props }) {
  return (
    <select style={convertProps(props)} {...props} className="select ui-base">
      <option>{label}</option>
      {options.map((o, i) => (
        <option selected={o === value} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

/****************************************************************************************************
 *                                          Snackbar
 ****************************************************************************************************/
export const Snackbar = ({
  children,
  open,
  where = "sw",
  onClose,
  ...props
}) => {
  return (
    <Iw {...props}>
      <Backdrop open={open} onClose={onClose} />
      <Box className={css({ snackbar: 1, open, [where]: 1 })}>{children}</Box>
    </Iw>
  );
};

/****************************************************************************************************
 *                                          Spacer
 ****************************************************************************************************/
export const Spacer = () => <Box sx={{ flexGrow: 1 }} />;

/****************************************************************************************************
 *                                          Spinner
 ****************************************************************************************************/
export function Spinner({ children, ...props }) {
  return (
    <Center {...props} className="spinner">
      {children}
    </Center>
  );
}
/****************************************************************************************************
 *                                           Stack
 ****************************************************************************************************/
export const Stack = ({ children, ...props }) => (
  <Flex column className="ui-text" style={convertProps(props)} {...props}>
    {children}
  </Flex>
);

/****************************************************************************************************
 *                                          Switch
 ****************************************************************************************************/
export function Switch({ onChange, ...props }) {
  return (
    <Iw {...props} variant="filled">
      <div
        onClick={() => onChange && !props.disabled && onChange(!props.checked)}
        className="switch"
        style={convertProps(props)}
        {...props}
      >
        <div className="knob-o" />
        <div className="knob-i" />
        <div className="bar" />
      </div>
    </Iw>
  );
}

/****************************************************************************************************
 *                                           TextBox
 ****************************************************************************************************/
export function TextBox({
  fullWidth,
  style,
  multiple,
  value,
  rows = 3,
  ...props
}) {
  const width = fullWidth ? "100%" : "inherit";
  const args = {
    className: "ui-base text-box",
    rows,
    value,
    style: { width, ...style, ...convertProps(props) },
    ...props,
  };
  if (multiple) {
    return <textarea {...args}>{value}</textarea>;
  }
  return <input {...args} />;
}

/****************************************************************************************************
 *                                          Typography
 ****************************************************************************************************/
export function Typography({ variant = "body1", children, ...props }) {
  return (
    <Iw {...props}>
      <div
        style={convertProps(props)}
        {...props}
        className={css({ typo: 1, [variant]: 1, [props.className]: 1 })}
      >
        {children}
      </div>
    </Iw>
  );
}

function Iw({ inspect, children, ...props }) {
  if (inspect)
    return (
      <Inspector>
        <Tw {...props}>{children}</Tw>
      </Inspector>
    );
  return <Tw {...props}>{children}</Tw>;
}

/****************************************************************************************************
 * InspectorBody (internal)
 ****************************************************************************************************/
function InspectorBody({ name, styles }) {
  const [filterText, setFilterText] = React.useState("");
  return (
    <>
      {" "}
      <Box className="inspector-stat-box">
        {!!styles && (
          <List
            header={
              <Stack>
                <Typography variant="subtitle" mb={2}>
                  Styles for &lt;{name} /&gt;
                </Typography>
                <TextBox
                  mb={2}
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </Stack>
            }
            items={styles
              .filter((r) => !!r.value)
              .filter(
                (e) =>
                  !filterText ||
                  e.key.toLowerCase().indexOf(filterText.toLowerCase()) > -1
              )
              .map((j, i) => (
                <Stack p={1}>
                  <Typography variant="subtitle">{j.key}</Typography>
                  <Typography
                    className="inspector-stat-value"
                    variant="caption"
                  >
                    {j.value}
                  </Typography>
                </Stack>
              ))}
          />
        )}
      </Box>
    </>
  );
}

export { css };
