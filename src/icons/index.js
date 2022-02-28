import React from 'react';

const IconBase = ({ src, ...props }) => <img {...props} src={src} alt="icon" />;

export const Close = (p) => <IconBase {...p} src="/icon/x.svg" />;
export const ChevronLeft = (p) => (
  <IconBase {...p} src="/icon/chevron-left.svg" />
);
export const ChevronsLeft = (p) => (
  <IconBase {...p} src="/icon/chevrons-left.svg" />
);
export const ChevronRight = (p) => (
  <IconBase {...p} src="/icon/chevron-right.svg" />
);
export const Play = (p) => <IconBase {...p} src="/icon/play.svg" />;
export const Info = (p) => <IconBase {...p} src="/icon/info.svg" />;
export const AlertCircle = (p) => (
  <IconBase {...p} src="/icon/alert-circle.svg" />
);
export const AlertTriangle = (p) => (
  <IconBase {...p} src="/icon/alert-triangle.svg" />
);
export const CheckCircle = (p) => (
  <IconBase {...p} src="/icon/check-circle.svg" />
);

export const Database = (p) => <IconBase {...p} src="/icon/database.svg" />;
export const Plus = (p) => <IconBase {...p} src="/icon/plus.svg" />;
export const Key = (p) => <IconBase {...p} src="/icon/key.svg" />;
export const Hamburger = (p) => <IconBase {...p} src="/icon/menu.svg" />;
export const Lock = (p) => <IconBase {...p} src="/icon/lock.svg" />;
export const Logout = (p) => <IconBase {...p} src="/icon/log-out.svg" />;
export const Aperture = (p) => <IconBase {...p} src="/icon/aperture.svg" />;
export const Dribble = (p) => <IconBase {...p} src="/icon/dribble.svg" />;
export const Sync = (p) => <IconBase {...p} src="/icon/refresh-cw.svg" />;
export const Smiley = (p) => (
  <IconBase width="24" height="24" {...p} src="/icon/smiley.svg" />
);
