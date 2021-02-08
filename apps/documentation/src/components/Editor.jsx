import React from "react";
import dynamic from "next/dynamic";

export const Editor = dynamic(
  () => import("@dirtwork/react-livedoc").then((m) => m.Code),
  { ssr: false }
);
export const EditorContextProvider = dynamic(
  () => import("@dirtwork/react-livedoc").then((m) => m.CodeContextProvider),
  { ssr: false }
);
