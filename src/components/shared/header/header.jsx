import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import Link from 'components/shared/link';
import LINKS from 'constants/links';
import ArrowIcon from 'icons/arrow.inline.svg';
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

          <ul className="flex items-center space-x-1.5">
            <li className="md:hidden">
              <Link
                className="flex items-center space-x-2 px-2 text-sm transition-colors duration-200 hover:text-primary-2 dark:hover:text-primary-1"
                {...LINKS.documentation}
              >
                Documentation
              </Link>
            </li>
            <li className="md:hidden">
              <Link
                className="flex items-center space-x-2 px-2 text-sm transition-colors duration-200 hover:text-primary-2 dark:hover:text-primary-1"
                {...LINKS.github}
              >
                GitHub
              </Link>
            </li>
            <li className="md:hidden">
              <Link
                className="flex items-center space-x-2 px-2 text-sm transition-colors duration-200 hover:text-primary-2 dark:hover:text-primary-1"
                {...LINKS.discord}
              >
                Community
              </Link>
            </li>
            <span className="!mr-1.5 !ml-3 flex h-6 w-px bg-gray-10 dark:bg-gray-3" aria-hidden />
            <li>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 hover:bg-[#e9edf0] dark:hidden"
                type="button"
                title="Switch between dark and light mode (currently light mode)"
                aria-label="Switch between dark and light mode (currently light mode)"
                onClick={() => setSelectedTheme('dark')}
              >
                <MoonIcon className="h-6" />
              </button>
              <button
                className="hidden h-8 w-8 items-center justify-center rounded-full transition-colors duration-200 hover:bg-[#444950] dark:flex"
                type="button"
                title="Switch between dark and light mode (currently dark mode)"
                aria-label="Switch between dark and light mode (currently dark mode)"
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
