import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Link from 'components/shared/link';
import LINKS from 'constants/links';
import ArrowIcon from 'icons/arrow.inline.svg';
import Logo from 'images/logo.inline.svg';

import MoonIcon from './images/moon.inline.svg';
import SunIcon from './images/sun.inline.svg';
import Search from './search';

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

  const handleChangeActiveItem = () => {
    const { hash } = window.location;
    setSelectValue(hash);
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
    <header className="safe-paddings fixed top-0 left-0 right-0 z-50 w-full border-b border-gray-10 bg-white dark:border-gray-3 dark:bg-black">
      <div className="container flex h-16 items-center justify-between">
        <Link {...LINKS.home}>
          <span className="sr-only">Novu API Reference</span>
          <Logo className="h-8" aria-hidden />
        </Link>

        <Search />

        <div className="flex space-x-3.5">
          <div className="relative z-10 hidden items-center lg:flex">
            <select
              className="appearance-none flex-wrap bg-transparent pr-4 text-right text-gray-2 outline-none dark:text-gray-8 sm:max-w-[180px] xs:max-w-[100px]"
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
            <ArrowIcon className="absolute right-0 -z-10 mt-0.5 h-1.5 dark:text-gray-8" />
          </div>

          <ul>
            <li>
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
