import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import ParametrWithType from 'components/shared/parametr-with-type';
import ArrowIcon from 'icons/arrow.inline.svg';

export const RESPONSE_CODE_THEMES = {
  green: 'green',
  red: 'red',
};

export const ResponseCode = ({ className, code, description, schema, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasSchema = schema && schema.properties && Object.keys(schema.properties).length > 0;

  const Tag = hasSchema ? 'button' : 'div';

  const handleOpen = () => setIsOpen((prevState) => !prevState);

  return (
    <>
      <Tag
        className={clsx(
          'flex w-full items-center justify-between py-4',
          {
            'pointer-events-none': !hasSchema,
          },
          className
        )}
        onClick={handleOpen}
      >
        <div>
          <div className="flex items-center space-x-2.5">
            <span
              className={clsx('h-3 w-3 rounded-full', {
                'bg-secondary-5': theme === RESPONSE_CODE_THEMES.green,
                'bg-[#FF3366]': theme === RESPONSE_CODE_THEMES.red,
              })}
            />
            <span className="text-base font-medium">{code}</span>
          </div>
          <p className="font-book text-gray-6 dark:text-gray-10">{description}</p>
        </div>
        {hasSchema && (
          <ArrowIcon
            className={clsx(
              'h-[9px] text-black transition-transform duration-200 dark:text-gray-8',
              {
                'rotate-180': isOpen,
              }
            )}
          />
        )}
      </Tag>

      {isOpen && (
        <ul className="rounded-sm border border-gray-10 dark:border-gray-4">
          <span className="block border-b border-gray-10 py-2 px-3 text-sm text-gray-6 dark:border-gray-4 dark:text-gray-8">
            {schema.type}
          </span>
          {Object.keys(schema.properties).map((propertyName, index) => {
            const { type, description, properties } = schema.properties[propertyName];

            return (
              <ParametrWithType
                className="px-3 last:border-none"
                name={propertyName}
                type={type}
                // eslint-disable-next-line react/prop-types
                isRequired={schema.required?.includes(propertyName)}
                description={description}
                subParameters={properties}
                key={index}
              />
            );
          })}
        </ul>
      )}
    </>
  );
};

ResponseCode.propTypes = {
  className: PropTypes.string,
  code: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  schema: PropTypes.objectOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      properties: PropTypes.objectOf(
        PropTypes.shape({
          type: PropTypes.string.isRequired,
          description: PropTypes.string,
        })
      ).isRequired,
      required: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
  theme: PropTypes.oneOf(Object.values(RESPONSE_CODE_THEMES)).isRequired,
};

ResponseCode.defaultProps = {
  className: null,
  schema: null,
};
