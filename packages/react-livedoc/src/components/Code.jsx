import React, { useState, useEffect, useContext, useMemo } from "react";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import DotIcon from "@material-ui/icons/FiberManualRecord";
import { makeStyles } from "@material-ui/core/styles";
import ReactDir, { Dir } from "react-dir";
import { useDebounce } from "../utils/utils";
import { transpile } from "../utils/compile";
import { CodeContext, createRequire } from "./CodeContext";
import { Controlled as CodeMirror } from "react-codemirror2";
import PerfectScrollbar from "react-perfect-scrollbar";
import unpkgRequire from "../utils/require";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/clike/clike";
import "codemirror/mode/ruby/ruby";
import "codemirror/mode/jsx/jsx";
import "codemirror/mode/shell/shell";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/matchtags";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/scroll/simplescrollbars";

const useStyles = makeStyles(() => ({
  toolbar: {
    minHeight: 32,
  },
  fill: {
    flexGrow: 1,
  },
  result: {
    padding: 8,
  },
}));

const myLookup = {
  react: React,
  "react-dir": ReactDir,
};
function myRequire(props) {
  return myLookup[props];
}

const lookup = {
  c: "text/x-csrc",
  cs: "text/x-csharp",
  sh: "text/x-sh",
  bash: "text/x-sh",
  java: "text/x-java",
  cpp: "text/x-c++src",
  ruby: "text/x-ruby",
  javascript: "text/javascript",
  js: "text/javascript",
  jsx: "jsx",
};
const ErrorIndicator = ({ error }) => {
  return error ? (
    <Tooltip title={error}>
      <DotIcon size="small" fontSize="small" color="secondary" />
    </Tooltip>
  ) : (
    <DotIcon size="small" fontSize="small" color="primary" />
  );
};
ErrorIndicator.propTypes = {
  error: PropTypes.any,
};
const Code = ({ className, children, live }) => {
  const reqLookup = useContext(CodeContext);
  const myRequire = useMemo(() => createRequire(reqLookup), [reqLookup]);
  const [value, setValue] = useState(children ? children.trim() : "");
  const [result, setResult] = useState(undefined);
  const [error, setError] = useState(undefined);
  const classes = useStyles();
  let source = useDebounce(value, 100);
  let mode = className.replace("language-", "");
  let mime = lookup[mode];
  if (mime) mode = mime;
  const options = {
    theme: "material",
    mode,
    lineNumbers: Boolean(live),
    readOnly: live ? false : "nocursor",
    matchBrackets: true,
    autoCloseBrackets: true,
    autoCloseTags: true,
    scrollbarStyle: "overlay",
  };

  useEffect(() => {
    if (source && (mode === "jsx" || mode.includes("javascript"))) {
      setResult(() => {
        try {
          const transpiled = transpile(source);
          const result = new Function("require", transpiled)(myRequire);
          //const result = new Function("require", transpiled)(unpkgRequire);
          setError(undefined);
          return result;
        } catch (e) {
          //console.error(e);
          setError(e.message);
        }
      });
    } else {
      //In this case, there is no source to parse.
      setError(undefined);
      setResult(undefined);
    }
  }, [source]);

  return live ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "solid 1px black",
      }}
    >
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.fill} />
        <ErrorIndicator error={error} />
      </Toolbar>
      <CodeMirror
        value={value}
        options={options}
        onBeforeChange={(editor, data, value) => setValue(value)}
      />
      <div className={classes.result}>
        {error ? (
          <Typography color="secondary">Error: {error}</Typography>
        ) : (
          <PerfectScrollbar>
            <div style={{ maxHeight: 200, paddingBottom: 16 }}>
              <Dir value={result} />
            </div>
          </PerfectScrollbar>
        )}
      </div>
    </div>
  ) : (
    <div>
      <CodeMirror value={children} options={options} />
    </div>
  );
};
Code.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string,
  live: PropTypes.bool,
};

export default Code;
