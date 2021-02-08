import React, { useContext } from "react";
import PropTypes from "prop-types";
import { DirContext } from "../utils/common";
import { Collapsible } from "./Collapsible";
import { Collapsed } from "./Collapsed";
import { ClosedObject } from "./DirObject";
import { ClosedArray } from "./DirArray";
import { DirAtomic } from "./DirAtomic";
import { DirComponent } from "./DirComponent";

export const Dir = ({ name, value, withCaret, closed, collapsed = true }) => {
  const {
    undefinedColor,
    nullColor,
    booleanColor,
    nanColor,
    numericColor,
    stringColor,
  } = useContext(DirContext);
  let component;
  if (React.isValidElement(value)) {
    component = (
      <DirComponent name={name} withCaret={withCaret} value={value} />
    );
  } else if (value === undefined) {
    component = (
      <DirAtomic
        name={name}
        withCaret={withCaret}
        value="undefined"
        color={undefinedColor}
      />
    );
  } else if (value === null) {
    component = (
      <DirAtomic
        name={name}
        withCaret={withCaret}
        value="null"
        color={nullColor}
      />
    );
  } else if (typeof value === "boolean") {
    component = (
      <DirAtomic
        name={name}
        withCaret={withCaret}
        value={value.toString()}
        color={booleanColor}
      />
    );
  } else if (typeof value === "number") {
    component = (
      <DirAtomic
        name={name}
        withCaret={withCaret}
        value={value.toString()}
        color={isNaN(value) ? nanColor : numericColor}
      />
    );
  } else if (typeof value === "string") {
    component = (
      <DirAtomic
        name={name}
        withCaret={withCaret}
        value={`"${value}"`}
        color={stringColor}
      />
    );
  } else {
    let Closed;
    if (value instanceof Array) {
      Closed = ClosedArray;
    } else {
      Closed = ClosedObject;
    }
    component = closed ? (
      <Collapsed name={name} value={value} />
    ) : (
      <Collapsible
        Closed={Closed}
        name={name}
        value={value}
        collapsed={collapsed}
      />
    );
  }
  return component;
};
Dir.propTypes = {
  value: PropTypes.any,
  name: PropTypes.string,
  withCaret: PropTypes.bool,
  closed: PropTypes.bool,
  collapsed: PropTypes.bool,
};
