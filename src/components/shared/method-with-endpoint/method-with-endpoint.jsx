import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const styles = {
  put: 'bg-[rgba(255,225,77,0.15)] dark:text-secondary-2',
  get: 'bg-[rgba(0,227,189,0.15)] dark:text-primary-1',
  delete: 'bg-[rgba(227,0,189,0.15)] dark:text-secondary-1',
  post: 'bg-[rgba(0,213,255,0.15)] dark:text-secondary-5',
};

const MethodWithEndpoint = ({ className, method, endpoint }) => (
  <div className={clsx('flex space-x-2.5', className)}>
    <span
      className={clsx(
        'flex flex-shrink-0 items-center whitespace-nowrap rounded-sm px-1.5 font-mono uppercase leading-none',
        styles[method]
      )}
    >
      {method}
    </span>
    <span className="break-all text-lg font-book dark:text-gray-10 md:text-base xs:text-sm">
      {endpoint}
    </span>
  </div>
);

MethodWithEndpoint.propTypes = {
  className: PropTypes.string,
  method: PropTypes.oneOf(Object.keys(styles)).isRequired,
  endpoint: PropTypes.string.isRequired,
};

MethodWithEndpoint.defaultProps = {
  className: null,
};

export default MethodWithEndpoint;
