import React, { useContext } from "react";
import { DirContext } from "../utils/common";

export const More = () => {
  const { moreColor: color } = useContext(DirContext);
  return <span style={{ display: "inline", color }}>&#x2026;</span>;
};
