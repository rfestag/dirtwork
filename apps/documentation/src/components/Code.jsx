import React from "react";
import { Editor, EditorContextProvider } from "./Editor";

const myRequire = {
  react: React,
};

const Code = ({ className, live, children }) => {
  return (
    <EditorContextProvider value={myRequire}>
      <Editor className={className} live={live}>
        {children}
      </Editor>
    </EditorContextProvider>
  );
};
export default Code;
