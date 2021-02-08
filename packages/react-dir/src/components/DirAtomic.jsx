import React from "react";
import PropTypes from "prop-types";
import { CaretBlank } from "./Caret";

export const DirAtomic = ({ name, color, withCaret, value }) => {
  return (
    <span>
      {withCaret && <CaretBlank />}
      {name && <span style={{ paddingRight: 4 }}>{name}:</span>}
      <span style={{ color }}>{value}</span>
    </span>
  );
};
DirAtomic.propTypes = {
  value: PropTypes.any,
  color: PropTypes.string,
  name: PropTypes.string,
  withCaret: PropTypes.bool,
};
