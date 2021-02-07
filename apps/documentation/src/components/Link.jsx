import React from "react";
import PropTypes from "prop-types";
import NextLink from "next/link";
import Link from "@material-ui/core/Link";
import LinkOutIcon from "@material-ui/icons/CallMade";

const absolute = new RegExp("^([a-z]+://|//)", "i");

class A extends React.Component {
  render() {
    const { href, children, ...props } = this.props;
    const external = absolute.test(href);

    return external ? (
      <Link
        href={href}
        {...props}
        variant="body1"
        rel="noopener"
        target="_blank"
      >
        {children}
        <sup>
          <LinkOutIcon style={{ fontSize: 8 }} />
        </sup>
      </Link>
    ) : (
      <NextLink href={href} passHref>
        <Link variant="body1" {...props}>
          {children}
        </Link>
      </NextLink>
    );
  }
}
A.propTypes = {
  href: PropTypes.string,
  children: PropTypes.any,
};
export default A;
