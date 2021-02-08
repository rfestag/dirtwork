import React from "react";
import PropTypes from "prop-types";
import { Dir } from "./Dir";
import { More } from "./More";

export const InlineListProps = ({ value, showKeys = true, size = 10 }) => {
  const keys = Object.keys(value);
  const first = keys.slice(0, size);
  const last = keys.slice(size);

  return (
    <ul style={{ listStyleType: "none", paddingLeft: 8, display: "inline" }}>
      {first.map((k, i) => {
        return (
          <li
            key={k}
            style={{ paddingLeft: 0, paddingRight: 8, display: "inline" }}
          >
            <Dir
              value={value[k]}
              name={showKeys ? k : undefined}
              withCaret={false}
              closed={true}
            />
            {i !== first.length - 1 || last.length ? "," : null}
          </li>
        );
      })}
      {last.length ? (
        <li style={{ paddingLeft: 0, paddingRight: 8, display: "inline" }}>
          <More />
        </li>
      ) : null}
    </ul>
  );
};
InlineListProps.propTypes = {
  value: PropTypes.any,
  showKeys: PropTypes.bool,
  size: PropTypes.number,
};
