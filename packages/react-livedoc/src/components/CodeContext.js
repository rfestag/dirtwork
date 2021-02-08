import React, { useState, useEffect, useContext } from "react";

const defaultLookup = {
  react: React,
};

export const createRequire = (lookup = {}) => {
  const localLookup = { ...defaultLookup, ...lookup };
  return (props) => {
    return localLookup[props];
  };
};
export const CodeContext = React.createContext([defaultLookup]);
export const CodeContextProvider = CodeContext.Provider;
