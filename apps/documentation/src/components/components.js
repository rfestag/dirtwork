import React, { memo } from "react";
import PropTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";
import Link from "./Link";

const useStyles = makeStyles((theme) => ({
  blockquote: {
    borderLeft: "4px solid grey",
    padding: theme.spacing(1),
  },
  list: {
    paddingLeft: theme.spacing(3),
  },
  ol: ({ className, depth }) => {
    const listStyleType =
      className === "contains-task-list"
        ? "none"
        : olStyles[depth % olStyles.length];
    return { listStyleType, paddingLeft: theme.spacing(3) };
  },
  checkbox: {
    padding: 0,
  },
}));
const olStyles = ["decimal", "lower-roman", "lower-latin"];

const components = {
  a: (() => {
    const A = (props) => <Link {...props} />;
    return memo(A);
  })(),
  p: (() => {
    const P = (props) => (
      <Typography {...props} variant="body1" paragraph={true} />
    );
    return memo(P);
  })(),
  h1: (() => {
    const H1 = (props) => (
      <Typography {...props} id={props.children} variant="h1" />
    );
    H1.propTypes = {
      children: PropTypes.any,
    };
    return memo(H1);
  })(),
  h2: (() => {
    const H2 = (props) => (
      <Typography {...props} id={props.children} variant="h2" />
    );
    H2.propTypes = {
      children: PropTypes.any,
    };
    return memo(H2);
  })(),
  h3: (() => {
    const H3 = (props) => (
      <Typography {...props} id={props.children} variant="h3" />
    );
    H3.propTypes = {
      children: PropTypes.any,
    };
    return memo(H3);
  })(),
  h4: (() => {
    const H4 = (props) => (
      <Typography {...props} id={props.children} variant="h4" />
    );
    H4.propTypes = {
      children: PropTypes.any,
    };
    return memo(H4);
  })(),
  h5: (() => {
    const H5 = (props) => (
      <Typography {...props} id={props.children} variant="h5" />
    );
    return memo(H5);
  })(),
  h6: (() => {
    const H6 = (props) => (
      <Typography {...props} id={props.children} variant="h6" />
    );
    return memo(H6);
  })(),
  blockquote: (() => {
    const Blockquote = (props) => {
      const { blockquote } = useStyles();
      return <Paper square className={blockquote} {...props} />;
    };
    return memo(Blockquote);
  })(),
  ul: (() => {
    const Ul = (props) => {
      const { list } = useStyles();
      return <Typography {...props} component="ul" className={list} />;
    };
    return memo(Ul);
  })(),
  ol: (() => {
    const Ol = ({ depth = 0, children, ...props }) => {
      const { ol } = useStyles({ depth, className: props.className });
      const elements = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { depth: depth + 1 });
        }
        return child;
      });
      return (
        <Typography {...props} depth={depth} component="ol" className={ol}>
          {elements}
        </Typography>
      );
    };
    return memo(Ol);
  })(),
  li: (() => {
    const Li = ({ depth = 0, children, ...props }) => {
      const elements = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { depth: depth + 1 });
        }
        return child;
      });
      return (
        <Typography {...props} component="li">
          {elements}
        </Typography>
      );
    };
    return memo(Li);
  })(),
  table: (() => {
    const T = (props) => (
      <TableContainer component={Paper}>
        <Table {...props} size="small" />
      </TableContainer>
    );
    return memo(T);
  })(),
  tr: (() => {
    const Tr = (props) => <TableRow {...props} />;
    return memo(Tr);
  })(),
  td: (() => {
    const Td = ({ align, ...props }) => (
      <TableCell align={align || undefined} {...props} />
    );
    Td.propTypes = {
      align: PropTypes.string,
    };
    return memo(Td);
  })(),
  tbody: (() => {
    const TBody = (props) => <TableBody {...props} />;
    return memo(TBody);
  })(),
  th: (() => {
    const Th = ({ align, ...props }) => (
      <TableCell align={align || undefined} {...props} />
    );
    Th.propTypes = {
      align: PropTypes.string,
    };
    return memo(Th);
  })(),
  thead: (() => {
    const THead = (props) => <TableHead {...props} />;
    return memo(THead);
  })(),
  hr: Divider,
  img: (props) => {
    return props.width && props.height ? (
      <Image {...props} />
    ) : (
      <img {...props} />
    );
  },
  input: (() => {
    const Input = (props) => {
      const { checkbox } = useStyles();
      const { type } = props;
      if (type === "checkbox") {
        return (
          <Checkbox
            size="small"
            disableRipple={true}
            disabled={true}
            readOnly={true}
            className={checkbox}
            {...props}
          />
        );
      }
      return <input {...props} />;
    };
    Input.propTypes = {
      type: PropTypes.string,
    };
    return memo(Input);
  })(),
  wrapper: (() => {
    const Wrapper = (props) => {
      return <div {...props} className="markdown-body" />;
    };
    return memo(Wrapper);
  })(),
};

export default components;
