import React from "react";
import PropTypes from "prop-types";
import { More } from "./More";
import { simpleObject } from "../utils/common";

const collapsedProperties = {
  name: PropTypes.string,
  value: PropTypes.any,
};

const CollapsedSimple = ({ name, value }) => (
  <span>
    {name && `${name} : `}
    {value.toString()}
  </span>
);
CollapsedSimple.propTypes = collapsedProperties;

const CollapsedComplex = ({ name, value }) => {
  const open = value instanceof Array ? "[" : "{";
  const close = value instanceof Array ? "]" : "}";
  return (
    <span>
      {name && `${name} : `}
      {open}
      <span>
        <More />
      </span>
      {close}
    </span>
  );
};
CollapsedComplex.propTypes = collapsedProperties;

export const Collapsed = ({ name, value }) =>
  simpleObject(value) ? (
    <CollapsedSimple name={name} value={value} />
  ) : (
    <CollapsedComplex name={name} value={value} />
  );
Collapsed.propTypes = collapsedProperties;
