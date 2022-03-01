

const construct = (o, a) => {
  console.log ({a})
  a.split(' ').map(c => Object.assign(o, {[c]: 1}));  
  return o; 
}

const append = (o, a) => !(a?.split && a?.length)? o : construct(o, a);

export const css = (o, a) => { 
  // alert ([o,a])
  return Object.keys(o ?? {}) 
  .filter((i) => !!o[i])
  .join(" ");
}



