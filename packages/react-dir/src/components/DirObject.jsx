import React from "react";
import PropTypes from "prop-types";
import { Collapsed } from "./Collapsed";
import { ListProps } from "./ListProps";
import { InlineListProps } from "./InlineListProps";
import { CaretLeft, CaretDown } from "./Caret";
import { simpleObject } from "../utils/common";

const objectPropTypes = {
  name: PropTypes.string,
  value: PropTypes.any,
  onClick: PropTypes.func,
};
const ClosedSimpleObject = ({ name, value, onClick }) => (
  <span onClick={onClick}>
    <span>
      <CaretLeft />
      {name ? `${name}: ${value}` : value.toString()}
    </span>
  </span>
);
ClosedSimpleObject.propTypes = objectPropTypes;

const ClosedComplexObject = ({ name, value, onClick }) => (
  <span onClick={onClick}>
    <span>
      <CaretLeft />
      {name
        ? `${name}: ${value.constructor.name} {`
        : `${value.constructor.name} {`}
    </span>
    <span>
      <InlineListProps value={value} />
      <span>{"}"}</span>
    </span>
  </span>
);
ClosedComplexObject.propTypes = objectPropTypes;

export const ClosedObject = ({ name, value, onClick }) =>
  simpleObject(value) ? (
    <ClosedSimpleObject name={name} value={value} onClick={onClick} />
  ) : (
    <ClosedComplexObject name={name} value={value} onClick={onClick} />
  );
ClosedObject.propTypes = objectPropTypes;

export const OpenObject = ({ name, value, onClick }) => {
  return (
    <span>
      <span onClick={onClick}>
        <CaretDown />
        <span>
          {name && <span>{name}: </span>}
          <Collapsed value={value} />
        </span>
      </span>
      <ListProps value={value} />
    </span>
  );
};
OpenObject.propTypes = {
  value: PropTypes.any,
  onClick: PropTypes.func,
  name: PropTypes.string,
};
