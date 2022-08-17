import clsx from 'clsx';
import { Link as GatsbyLink } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

const styles = {
  base: 'inline-block leading-none transition-colors duration-200',
  size: {
    base: 'text-base',
    sm: 'text-sm',
  },
};

const Link = ({ className: additionalClassName, size, to, children, ...props }) => {
  const className = clsx(styles.base, styles.size[size], additionalClassName);

  if (to.startsWith('/')) {
    return (
      <GatsbyLink className={className} to={to} {...props}>
        {children}
      </GatsbyLink>
    );
  }

  return (
    <a className={className} href={to} {...props}>
      {children}
    </a>
  );
};

Link.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(styles.size)),
  children: PropTypes.node.isRequired,
};

Link.defaultProps = {
  className: null,
  to: null,
  size: null,
};

export default Link;
