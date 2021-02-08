/*eslint-env node */
import { transform } from "@babel/standalone";
const esprima = require("esprima");

//https://esprima.readthedocs.io/en/latest/syntactic-analysis.html#example-console-calls-removal
//TODO: Use the code above as an example to add an "await" for every require/import
const returnify = (source) => {
  let last;
  const required = [];
  esprima.parseScript(source, { jsx: true, tolerant: true }, (node, meta) => {
    if (node.type !== "Program") {
      last = [node, meta];
    }
  });
  let result = source;
  if (last) {
    const [node, meta] = last;
    //If it is already a return, we don't need to do anything. Otherwise...
    if (node.type !== "ReturnStatement") {
      if (node.type === "ImportDeclaration") {
        //If the last statement was an import, there really isn't anything to do...
        result = "";
      } else if (node.type === "VariableDeclaration") {
        //We can't do things like "return const ...". So, if we encounter a VariableDeclaration,
        //we return the result of the declaration
        result += `;\nreturn ${node.declarations[0].id.name}`;
      } else {
        //Otherwise, splice in a return before the last statement
        result =
          source.slice(0, meta.start.offset) +
          "return " +
          source.slice(meta.start.offset);
      }
    }
  } else {
    //This happens if we have a single-line literal value, so we just return it
    result = "return " + source;
  }
  return result;
};
export const transpile = (source) => {
  return transform(returnify(source), {
    presets: ["es2015", "react"],
    parserOpts: { allowReturnOutsideFunction: true },
  }).code;
};
