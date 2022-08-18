import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import PlusIcon from 'icons/plus.inline.svg';

import SubParametr from './sub-parametr';

const ParametrWithType = ({
  className,
  name,
  type,
  description,
  subParameters,
  isRequired,
  ...props
}) => {
  const { allOf, oneOf } = props;

  const [isOpen, setIsOpen] = useState(false);

  const parameters = subParameters || allOf || oneOf;

  const handleOpen = () => setIsOpen((prevState) => !prevState);

  return (
    <li className={clsx('border-b border-gray-10 py-4 dark:border-gray-4', className)}>
      <div className="flex space-x-2.5">
        <span className="font-mono text-sm font-semibold">{name}</span>
        <span className="flex items-center whitespace-nowrap rounded-sm bg-gray-10 px-1.5 font-mono text-sm leading-none text-gray-6 dark:bg-gray-3 dark:text-gray-8">
          {type && type}
          {!type && allOf && 'allOf'}
          {!type && oneOf && 'oneOf'}
          {!isRequired && ' (optional)'}
        </span>
      </div>
      {description && <p className="mt-2 font-book dark:text-gray-10">{description}</p>}
      {parameters && (
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
            {subParameters && (
              <span>{isOpen ? 'Hide child parameters' : 'Show child parameters'}</span>
            )}

            {((!subParameters && oneOf) || allOf) && (
              <span>{isOpen ? 'Hide parameters' : 'Show parameters'}</span>
            )}
          </span>
          {isOpen && (
            <ul>
              {Object.keys(parameters).map((propertyName, index) => {
                const { type, description, properties, items } = parameters[propertyName];

                const subParameters = properties || items?.properties;
                const hasSubParameters =
                  subParameters && subParameters && Object.keys(subParameters).length > 0;

                return !hasSubParameters ? (
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
                ) : (
                  <SubParametr
                    name={propertyName}
                    type={type}
                    description={description}
                    subParameters={subParameters}
                    // eslint-disable-next-line react/prop-types
                    isRequired={subParameters?.required?.includes(propertyName)}
                  />
                );
              })}
            </ul>
          )}
        </div>
      )}
    </li>
  );
};

ParametrWithType.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  description: PropTypes.string,
  subParameters: PropTypes.objectOf(
    PropTypes.shape({
      type: PropTypes.string,
      description: PropTypes.string,
      properties: PropTypes.objectOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          type: PropTypes.string,
          description: PropTypes.string,
        })
      ),
      items: PropTypes.shape({
        properties: PropTypes.objectOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            type: PropTypes.string,
            description: PropTypes.string,
          })
        ),
      }),
    })
  ),
  oneOf: PropTypes.objectOf(
    PropTypes.shape({
      type: PropTypes.string,
      description: PropTypes.string,
      properties: PropTypes.objectOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          type: PropTypes.string,
          description: PropTypes.string,
        })
      ),
      items: PropTypes.shape({
        properties: PropTypes.objectOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            type: PropTypes.string,
            description: PropTypes.string,
          })
        ),
      }),
    })
  ),
  allOf: PropTypes.objectOf(
    PropTypes.shape({
      type: PropTypes.string,
      description: PropTypes.string,
      properties: PropTypes.objectOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          type: PropTypes.string,
          description: PropTypes.string,
        })
      ),
      items: PropTypes.shape({
        properties: PropTypes.objectOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            type: PropTypes.string,
            description: PropTypes.string,
          })
        ),
      }),
    })
  ),
  isRequired: PropTypes.bool,
};

ParametrWithType.defaultProps = {
  className: null,
  type: null,
  description: null,
  subParameters: null,
  oneOf: null,
  allOf: null,
  isRequired: false,
};

export default ParametrWithType;
