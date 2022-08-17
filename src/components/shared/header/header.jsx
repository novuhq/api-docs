import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Link from 'components/shared/link';
import LINKS from 'constants/links';
import Logo from 'images/logo.inline.svg';

import MoonIcon from './images/moon.inline.svg';
import SunIcon from './images/sun.inline.svg';

const Header = ({ menuItems }) => {
  const [selectValue, setSelectValue] = useState('');
  const [selectedTheme, setSelectedTheme] = useState();

  useEffect(() => {
    if (selectedTheme) {
      document.documentElement.setAttribute('data-theme', selectedTheme);
    } else {
      setSelectedTheme(document.documentElement.getAttribute('data-theme'));
    }
  }, [selectedTheme]);

  const handleSelectChange = ({ target: { value } }) => {
    setSelectValue(value);
    window.location.hash = value;
  };

  return (
    <header className="safe-paddings fixed top-0 left-0 right-0 z-50 w-full border-b border-gray-10 bg-white dark:border-gray-3 dark:bg-black">
      <div className="container flex h-16 items-center justify-between">
        <Link {...LINKS.home}>
          <span className="sr-only">Novu API Reference</span>
          <Logo className="h-8" aria-hidden />
        </Link>

        <div className="flex space-x-3.5">
          <select
            className="hidden flex-wrap bg-transparent pr-2 text-right text-gray-8 outline-none lg:block sm:max-w-[180px] xs:max-w-[100px]"
            value={selectValue}
            onChange={handleSelectChange}
          >
            {menuItems.map(({ label, subItems }, index) => (
              <optgroup label={label} key={index}>
                {subItems.map(({ label, path }, index) => (
                  <option value={`#${path}`} key={index}>
                    {label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
          <ul>
            <li aria-hidden>
              <button
                className="block transition-colors duration-200 hover:text-secondary-2 dark:hidden"
                type="button"
                onClick={() => setSelectedTheme('dark')}
              >
                <MoonIcon className="h-6" />
              </button>
              <button
                className="hidden transition-colors duration-200 hover:text-secondary-2 dark:block"
                type="button"
                onClick={() => setSelectedTheme('light')}
              >
                <SunIcon className="h-6" />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  menuItems: PropTypes.arrayOf(
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
};

export default Header;
