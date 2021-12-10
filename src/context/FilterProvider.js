import React from "react";

export const FilterContext = React.createContext();

const FilterProvider = (props) => {
  const [filter, setFilter] = React.useState("");

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      {props.children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
