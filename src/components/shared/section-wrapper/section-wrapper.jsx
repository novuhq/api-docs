import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

const SectionWrapper = ({ className, id, children }) => (
  <section
    className={clsx(
      'border-b border-dashed border-gray-9 py-16 last:border-none dark:border-gray-4',
      className
    )}
    id={id}
  >
    <div className="grid grid-cols-[1fr_547px] gap-x-10 xl:grid-cols-[1fr_475px] md:grid-cols-[1fr_385px] sm:block sm:gap-x-0">
      {children}
    </div>
  </section>
);

SectionWrapper.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

SectionWrapper.defaultProps = {
  className: null,
};

export default SectionWrapper;
