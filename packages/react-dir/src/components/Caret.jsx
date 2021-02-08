import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DirContext } from "../utils/common";

export const Caret = ({ children }) => {
  const { caretColor: color } = useContext(DirContext);
  return (
    <span style={{ display: "inline-block", width: 8, paddingRight: 8, color }}>
      {children ? children : null}
    </span>
  );
};
Caret.propTypes = {
  children: PropTypes.any,
};
export const CaretLeft = () => <Caret>&#x25B6;</Caret>;
export const CaretDown = () => <Caret>&#x25BC;</Caret>;
export const CaretBlank = () => <Caret />;
