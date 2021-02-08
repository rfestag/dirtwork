import React from "react";
import PropTypes from "prop-types";
import { CaretBlank } from "./Caret";
import { ErrorBoundary } from "./ErrorBoundary";

export const DirComponent = ({ name, withCaret, value }) => {
  return (
    <ErrorBoundary>
      <span>
        {withCaret && <CaretBlank />}
        {name && <span style={{ paddingRight: 4 }}>{name}:</span>}
        {value}
      </span>
    </ErrorBoundary>
  );
};
DirComponent.propTypes = {
  value: PropTypes.any,
  name: PropTypes.string,
  withCaret: PropTypes.bool,
};
