import React, { useState } from "react";
import PropTypes from "prop-types";
import { OpenObject } from "./DirObject";

export const Collapsible = ({ name, value, collapsed = true, Closed }) => {
  const [open, setOpen] = useState(!collapsed);
  return open ? (
    <OpenObject onClick={() => setOpen(false)} name={name} value={value} />
  ) : (
    <Closed onClick={() => setOpen(true)} name={name} value={value} />
  );
};
Collapsible.propTypes = {
  Closed: PropTypes.any,
  name: PropTypes.string,
  value: PropTypes.any,
  collapsed: PropTypes.bool,
};
