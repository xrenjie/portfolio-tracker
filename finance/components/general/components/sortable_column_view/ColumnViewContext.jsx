import React, { createContext, useContext, useMemo, useState } from 'react';

const columnViewContext = createContext();

const useColumnViewContext = () => useContext(columnViewContext);

function ColumnViewProvider({ rows, sortConfig, children }) {
  const [sort, setSort] = useState(sortConfig && sortConfig[0].id);
  const sortConfigMap = useMemo(
    () =>
      sortConfig.reduce((acc, s) => {
        acc[s.id] = s;
        return acc;
      }, {}),
    [sortConfig]
  );
  const value = useMemo(
    () => ({
      rows,
      setSort,
      sort,
      sortConfig,
      sortConfigMap,
    }),
    [rows, sort, sortConfig, sortConfigMap]
  );
  return (
    <columnViewContext.Provider value={value}>
      {children}
    </columnViewContext.Provider>
  );
}

export { useColumnViewContext, ColumnViewProvider };
