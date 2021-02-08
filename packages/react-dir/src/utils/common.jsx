import React from "react";

export const DirDefaultStyle = {
  color: "dodgerblue",
  moreColor: "darkgray",
  caretColor: "darkgray",
  ellipseColor: "darkgray",
  undefinedColor: "darkgray",
  nullColor: "darkgray",
  nanColor: "darkgrey",
  booleanColor: "green",
  numericColor: "green",
  stringColor: "magenta",
  fontFamily: "monospace",
  fontSize: 12,
};
export const DirContext = React.createContext(DirDefaultStyle);
export const simpleObject = (value) => {
  return value instanceof RegExp || value instanceof Date;
};
