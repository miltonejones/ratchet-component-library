import React from "react";


export const paginate = (startPage, pageSize, length, label) => {
    const beginPage = startPage + 1;
    const pageNum = Math.ceil(beginPage / pageSize);
    const pageLen = Math.ceil(length / pageSize);
    const pageText = `Page ${pageNum} of  ${pageLen} pages`;
    const descText = `${beginPage} to ${Math.min(
      startPage + pageSize,
      length
    )} of  ${length} ${label}s`;
    const thisPage = startPage / pageSize;
    const last = startPage + pageSize >= length;
  
    return {
      pageText,
      descText,
      thisPage,
      last,
    };
  };

export default function usePagination({
    startPage,
    pageSize,
    length, 
    label = 'item' 
  }) {
    const [state, setState] = React.useState({ page: false });
    const pagination = paginate(startPage, pageSize, length, label);
    if (!length || length <= pageSize) return <i />;
    return {...pagination, ...state, startPage, setState }
}