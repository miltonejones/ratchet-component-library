import React from 'react';
import useComponentState from './useComponentState';

const styleParse = (i) =>
  Object.keys(i)
    .filter((i) => isNaN(i))
    .map((key) => ({ key, value: i[key] }));

export default function useInspector() {
  const { state, setState } = useComponentState();
  const { open, detail, stats, style } = state;
  const setOpen = (f) => setState('open', f);
  const ref = React.createRef();
  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const {
      offsetTop: y,
      offsetHeight: h,
      offsetWidth: w,
      offsetLeft: x,
      children,
    } = node;
    const figures = `x: ${x} y: ${y} w: ${w} h: ${h} `;

    /**
     * IMPORTANT: don't do anything unless values change
     */
    if (stats === figures) return;
    setState('stats', figures);
    setState('style', {
      '--inspector-top': `${y}px`,
      '--inspector-left': `${x}px`,
    });
    !!children &&
      setState(
        'detail',
        ((x) => {
          Array.from(children)
            .filter((c) => c.className !== 'stats')
            .map((c, index) => {
              x.push({
                index,
                name: c.localName + '.' + c.className,
                styles: styleParse(window.getComputedStyle(c)),
              });
            });
          return x;
        })([])
      );
  }, [ref, stats]);
  const shown = !detail?.length ? null : detail[0];
  return {
    open,
    setOpen,
    shown,
    ref,
    stats,
    style,
  };
}
