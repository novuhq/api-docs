import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import MoonIcon from './images/moon.inline.svg';
import SunIcon from './images/sun.inline.svg';

const ThemeSwitcher = ({ className }) => {
  const [selectedTheme, setSelectedTheme] = useState();

  useEffect(() => {
    if (selectedTheme) {
      document.documentElement.setAttribute('data-theme', selectedTheme);
    } else {
      setSelectedTheme(document.documentElement.getAttribute('data-theme'));
    }
  }, [selectedTheme]);

  return (
    <div className={className}>
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
    </div>
  );
};

ThemeSwitcher.propTypes = {
  className: PropTypes.string,
};

ThemeSwitcher.defaultProps = {
  className: null,
};

export default ThemeSwitcher;
