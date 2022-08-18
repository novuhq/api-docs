import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Link from 'components/shared/link';

const Navigation = ({ items, location }) => {
  const [activePath, setActivePath] = useState(location.hash.slice(1));

  // TODO: need to review the logic and take into account the scrolling to the active element at the initial loading of the page
  const handleScrollToActiveItem = (hash) => {
    const container = document.querySelector('.navigation');
    const containerRect = container.getBoundingClientRect();

    const item = document.querySelector(`li[data-hash="${hash}"]`);
    const itemRect = item.getBoundingClientRect();

    if (containerRect.top + containerRect.height > itemRect.top + itemRect.height) {
      container.scrollTop += itemRect.top - containerRect.top - 200;
    }
  };

  const handleChangeActiveItem = () => {
    const hash = window.location.hash.replace('#', '');
    setActivePath(hash);
    handleScrollToActiveItem(hash);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('changeUrl', handleChangeActiveItem);

      return () => {
        window.removeEventListener('changeUrl', handleChangeActiveItem);
      };
    }

    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative before:absolute before:top-0 before:right-full before:h-full before:w-screen before:bg-white dark:before:hidden lg:hidden">
      <div className="navigation scrollbar-hidden sticky top-0 h-full max-h-screen overflow-y-auto border-r border-gray-10 bg-white py-16 dark:border-gray-3 dark:bg-black">
        <nav className="w-72 py-5 pr-10">
          <ul className="mt-3.5 space-y-5">
            {items.map((item, index) => (
              <li key={index}>
                <h3 className="text-sm font-medium uppercase leading-tight">{item.label}</h3>
                <ul className="mt-4">
                  {item.subItems.map((link) => (
                    <li className="relative" data-hash={link.path} key={link.path}>
                      <Link
                        className={clsx(
                          'block w-full px-3.5 py-2.5 text-sm font-book leading-snug text-gray-4 transition-colors duration-200 dark:text-gray-10',
                          link.path === activePath
                            ? 'bg-[rgba(0,85,255,0.08)] !font-medium text-[#0055FF] dark:bg-[rgba(0,213,255,0.12)] dark:!text-primary-1'
                            : 'hover:bg-[rgba(0,85,255,0.08)] hover:text-[#0055FF] dark:hover:bg-[rgba(0,213,255,0.12)] dark:hover:text-primary-1'
                        )}
                        to={`#${link.path}`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

Navigation.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      subItems: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
  }).isRequired,
};

export default Navigation;
