import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import PlusIcon from 'icons/plus.inline.svg';

const SubSubParametr = ({ name, type, description, subParameters, isRequired }) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasSubParameters = subParameters && Object.keys(subParameters).length > 0;

  const handleOpen = () => setIsOpen((prevState) => !prevState);

  return (
    <li className="space-y-5 border-b border-gray-10 p-4 px-3 last:border-none dark:border-gray-4">
      <div className="flex space-x-2.5">
        <span className="font-mono text-sm font-semibold">{name}</span>
        {type && (
          <span className="flex items-center whitespace-nowrap rounded-sm bg-gray-10 px-1.5 font-mono text-sm leading-none text-gray-6 dark:bg-gray-3 dark:text-gray-8">
            {type}
            {!isRequired && ' (optional)'}
          </span>
        )}
      </div>
      {description && <p className="mt-2 font-book dark:text-gray-10">{description}</p>}
      {hasSubParameters && (
        <div
          className={clsx(
            'mt-3 inline-block rounded-sm border border-gray-10 outline-none transition-all duration-200 dark:border-gray-4',
            {
              'w-full': isOpen,
            }
          )}
        >
          <span
            className={clsx(
              'flex h-8 cursor-pointer items-center space-x-1.5 px-3 text-sm leading-none text-gray-6 dark:text-gray-8',
              {
                'border-b border-gray-10 dark:border-gray-4': isOpen,
              }
            )}
            role="button"
            tabIndex={0}
            onClick={handleOpen}
            onKeyPress={handleOpen}
          >
            <PlusIcon
              className={clsx('h-[9px] transition-transform duration-200', {
                'rotate-45': isOpen,
              })}
            />
            <span>{isOpen ? 'Hide child parameters' : 'Show child parameters'}</span>
          </span>
          {isOpen && (
            <ul>
              {Object.keys(subParameters).map((propertyName, index) => {
                const { type, description } = subParameters[propertyName];

                return (
                  <li
                    className="space-y-5 border-b border-gray-10 p-4 px-3 last:border-none dark:border-gray-4"
                    key={index}
                  >
                    <div className="flex space-x-2.5">
                      <span className="font-mono text-sm font-semibold">{propertyName}</span>
                      {type && (
                        <span className="flex items-center whitespace-nowrap rounded-sm bg-gray-10 px-1.5 font-mono text-sm leading-none text-gray-6 dark:bg-gray-3 dark:text-gray-8">
                          {type}
                          {!isRequired && ' (optional)'}
                        </span>
                      )}
                    </div>
                    {description && <p className="font-book dark:text-gray-10">{description}</p>}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </li>
  );
};

SubSubParametr.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  description: PropTypes.string,
  subParameters: PropTypes.objectOf(
    PropTypes.shape({
      type: PropTypes.string,
      description: PropTypes.string,
      properties: PropTypes.objectOf(
        PropTypes.shape({
          name: PropTypes.string,
          type: PropTypes.string,
          description: PropTypes.string,
        })
      ),
    })
  ),
  isRequired: PropTypes.bool,
};

SubSubParametr.defaultProps = {
  type: null,
  description: null,
  subParameters: null,
  isRequired: false,
};

export default SubSubParametr;
