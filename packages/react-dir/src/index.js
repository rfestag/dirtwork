import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Dir as DirChild } from "./components/Dir";
import { DirContext, DirDefaultStyle } from "./utils/common";

const Dir = ({ value, collapsed = true }) => {
  const { color, fontSize, fontFamily } = useContext(DirContext);
  return (
    <div style={{ fontFamily, fontSize, color }}>
      <DirChild value={value} collapsed={collapsed} />
    </div>
  );
};
Dir.propTypes = {
  /** The value to render. */
  value: PropTypes.any,
  /** Whether to collapse complex values by default (default is true) */
  collapsed: PropTypes.bool,
};

export { Dir, DirContext, DirDefaultStyle };
