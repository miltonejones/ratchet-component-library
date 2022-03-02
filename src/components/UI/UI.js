import React from "react";
import "./UI.css";
import "./theme.css";
import {
  convertProps,
  css, 
  Cw,
  THEME_SPACING,
  useInspector,
  useCollapse,
} from "./Themer";
import useComponentState from "./hooks/useComponentState";
import usePagination from "./hooks/usePagination";
import { AlertCircle, CheckCircle, AlertTriangle, Info, ChevronLeft, ChevronRight } from "../../icons";



const createClasses = (props, classes, defaultValues) => {
  // only values with defaults are picked up here
  Object.keys(defaultValues).map(t => {
    const prop =  props[t] || defaultValues[t]
    // for boolean properties we want the key, 
    // not the value as the className
    const name = typeof prop !== 'boolean' ? prop : t; 
    !!prop && Object.assign(classes, { [name]: !0 })
  }) 
  // return string with any user classes appended
  return css(classes, props.className);
}



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
  const classes = { alert: 1, 'ui-text': 1 };
 
  
  return (
    <Iw {...props} severity={severity}>
      <Box
        style={{
          ...convertProps({...props, severity}),
          display: "flex",
          alignItems: "center",
        }}
        {...props}
        className={css(classes)}
      > 
        <Icon style={{ marginRight: 12, filter }} />
        {children}
      </Box>
    </Iw>
  );
}

/****************************************************************************************************
 *                                           AppBar
 ****************************************************************************************************/
export function AppBar({ children,   ...props }) { 
  const classes = { 'ui-control': !0 , 'app-bar': !0  };
  const def = { variant: 'fixed', bottom: false } ;
  return (
    <Flex align="center" className={createClasses(props, classes, def)} {...props}>
      {children}
    </Flex>
  );
}
 
export function BottomAppBar (props) {
  return <AppBar bottom {...props} />
}

/****************************************************************************************************
 *                                           Avatar
 ****************************************************************************************************/
export function Avatar({ children, src, alt, ...props }) {
  const image = <img src={src} alt={alt} />;
  const classes = { avatar: !0  };
  const def = { size: 'large', variant: 'circle' } ;
  return (
    <Center className={createClasses(props, classes, def)} {...props}>
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
 *                                            Button
 ****************************************************************************************************/
export function Button({ children, onClick, ...props }) {
  const classes = { 'ui-control': !0 , button: !0 };
  const def = { size: 'large', variant: 'outlined' } ;
  return (
    <Iw {...props}>
      <Center
        {...props}
        className={createClasses(props, classes, def)}
        style={convertProps(props)}
        onClick={(e) => !props.disabled && onClick && onClick(e)}
      >
        {children}
      </Center>
    </Iw>
  );
}

/****************************************************************************************************
 * Card
 * uses a FIELDSET tag to allow for fancy labels
 ****************************************************************************************************/
export function Card({ children, ...props }) {
  return (
    <Iw {...props}>
      <fieldset
        {...props}
        className="card ui-plain"
        style={  convertProps(props) }
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
    <Center
    {...props} 
      className={
        createClasses(
          props, {
            'ui-control': 1, 
            chip: 1
          }, {variant: 'outlined', size: 'small'})}
       style={convertProps(props)}>
      {!!icon && <Box>{icon}</Box>}
      {children}
    </Center>
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
  const styleName = css({ collapse: 1, on, [className]: 1, noscroll }, props.className);
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
  const style = {
    "--dialog-width": width,
    "--dialog-height": height,
  }
  return (
    <Iw {...props}>
      <Backdrop open={open} onClose={onClose} /> 
      <Box  style={style} className={css({ dialog: 1, open }, props.className)} {...props}>
        {children}
      </Box>
    </Iw>
  );
}

/****************************************************************************************************
 *                                          Divider
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
    ...convertProps(props),
  };

  const classes = {"ui": 1, flex: 1};
  // TODO: handle added classes in the css function 
 

  return (
    <Iw {...props} width={width}>
     {/* [[ {css(classes, props.className)}]] */}
      <div
        className={css(classes, props.className)}
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
      style={{ ...convertProps({...props, size}) }}
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
export function List({ items, children, dense = false, header, footer, ...props }) {
  const classes = { list: 1, dense }
  return (
    <ul
     {...props}
      className={createClasses(props, classes, { dense: false  })}
      style={convertProps({props})}
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

export function Pagination({click, ...props}) {
  const {
    page, 
    setState, 
    startPage, 
    last, 
    pageText, 
    descText
  } = usePagination(props);
  return <Iw {...props}>
    <Flex className="pagination">
      <div onClick={() => setState((s) => ({ page: !s.page }))}>
        {page ? pageText : descText}
      </div>
      <IconButton disabled={startPage < 1} click={() => click(-1)}>
          <ChevronLeft />
      </IconButton>
      <IconButton disabled={last} click={() => click(1)}>
          <ChevronRight />
      </IconButton>
    </Flex>
  </Iw>
}


/****************************************************************************************************
 * Paper 
 ****************************************************************************************************/
 export function Paper({ children, ...props }) {
  return (
    <Iw {...props}>
      <fieldset
        {...props}
        className={css({ paper: 1, 'ui-plain': 1 }, props.className)}
        style={  convertProps(props) }
      >
        {children}
      </fieldset>
    </Iw>
  );
}

/****************************************************************************************************
 *                                            Select
 ****************************************************************************************************/
export function SelectInner({ options = [], value, label, ...props }) {
  return (
    <select>
      <option>{label}</option>
      {options.map((o, i) => (
        <option selected={o === value} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

export function Select(props) {
  const classes = { 'ui-input': 1, 'select': 1 };
  const defaults = { color: 'default', size: 'medium' } ;
  return <Tw selector="select" defaults={defaults}  {...props}
        ><SelectInner {...props} /></Tw>
}

/****************************************************************************************************
 *                                          Snackbar
 ****************************************************************************************************/
export const Snackbar = ({
  children,
  open,
  where = "sw",
  onClose,
  color = "info",
  ...props
}) => {
  const classes = { 'ui-text': 1, snackbar: 1, open, [where]: 1 };
  const def = { color: 'info' } ;
 
  return (
    <Iw {...props}>
      <Backdrop open={open} onClose={onClose} />
      <Box style={convertProps({...props, color})}  className={createClasses(props, classes, def)}>{children}</Box>
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
  <Flex column style={convertProps(props)} {...props}>
    {children}
  </Flex>
);

/****************************************************************************************************
 *                                          Switch
 ****************************************************************************************************/
export function Switch({ onChange, ...props }) {
  const classes = { 'ui-control': 1, 'switch': 1 };
  const def = { color: 'info', checked: !1 } ;
  return (
    <Iw {...props} variant="filled">
      <div
        onClick={() => onChange && !props.disabled && onChange(!props.checked)}
        className={createClasses(props, classes, def)}
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
export function TextBoxInner({
  fullWidth,
  style,
  multiple,
  value,
  rows = 3,
  setFocus,
  ...props
}) {
  const ref = React.useRef(null)
  const width = fullWidth ? "100%" : "inherit";
  const args = {
    className: "ui-input text-box",
    rows,
    value,
    style: { width, ...style, ...convertProps(props) },
    ...props,
  };
  const onFocus = () =>  setFocus (true);
  const onBlur = () =>  setFocus (false);
  const onChange = React.useCallback((c) =>  setFocus (!!c.target.value?.length), []);
  React.useEffect(() => {
    const input = ref.current;
    if (input) {
      input.addEventListener('focus', onFocus)
      input.addEventListener('blur', () => (!!input.value ? onFocus : onBlur)()) 
      input.addEventListener('input', () => onChange) 
    
      return () => {
         input.removeEventListener('focus', onFocus)
         input.removeEventListener('blur', onBlur)
      } 
    }
  }, [ref, onChange]);

  if (multiple) {
    return <textarea {...args}>{value}</textarea>;
  }
  return <input ref={ref} {...args} />;
}

export function TextBox({label,  placeholder, ...props}) { 
  const [focus, setFocus] = React.useState(false);
  const defaults = { color: 'default', size: 'medium', variant: 'standard' } ;
  const labelText = placeholder && !focus ? placeholder : label;
  const labelClass = css ({ focus, placeholder: placeholder && !focus });
  const args = placeholder && focus ? { placeholder } : {}
  return <Tw defaults={defaults} {...props}
        >{!!label&&<label onClick={() => setFocus(!0)} className={labelClass}>{labelText}</label>}
        <TextBoxInner setFocus={setFocus} {...props} {...args} /></Tw>
}

/****************************************************************************************************
 *                                          Typography
 ****************************************************************************************************/
export function Typography({  children, ...props }) {
  const classes = { 'ui-plain': 1, typo: 1 };
  const defaults = {variant: 'body1' } 
  return (
    <Iw {...props}>
      <div
        style={convertProps(props)}
        {...props}
        className={createClasses(props, classes, defaults)}
      >
        {children}
      </div>
    </Iw>
  );
}


// Text Wrapper
function Tw({selector, defaults, children, ...props}) {
  const classes = { 'ui-input': 1, [selector]: 1 }; 
  return <Box  
          style={convertProps(props)}
          className={createClasses(props, classes, defaults)}
        >{children}</Box>
}

// Inspection Wrapper
function Iw({ inspect, children, ...props }) {
  if (inspect)
    return (
      <Inspector>
      {children}
      </Inspector>
    );
  return children
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
              <>
                <Typography variant="subtitle" mb={2}>
                  Styles for &lt;{name} /&gt;
                </Typography>
                <TextBox
                variant="outlined"
                size="small"
                label="Component Styles"
                placeholder="Search by style name"
                  mb={2}
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                />
              </>
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
