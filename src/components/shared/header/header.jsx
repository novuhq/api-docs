import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Burger from 'components/shared/burger';
import Link from 'components/shared/link';
import LINKS from 'constants/links';
import Logo from 'images/logo.inline.svg';

import Search from './search';
import ThemeSwitcher from './theme-switcher';

const Header = ({ isMobileMenuOpen, onBurgerClick }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <header
      className={clsx(
        'safe-paddings fixed top-0 left-0 right-0 z-50 w-full border-b border-gray-10 bg-white dark:border-gray-3 dark:bg-black',
        {
          'lg:border-primary-2 dark:lg:border-primary-1': isSearchActive,
        }
      )}
    >
      <div className="container flex h-16 items-center justify-between sm:space-x-2.5">
        <div className="flex items-center lg:space-x-4">
          <Burger
            className="hidden lg:block"
            isToggled={isMobileMenuOpen}
            onClick={onBurgerClick}
          />

          <Link {...LINKS.home}>
            <span className="sr-only">Novu API Reference</span>
            <Logo className="h-8" aria-hidden />
          </Link>

          <ThemeSwitcher className="hidden lg:block" />
        </div>

        <Search isActive={isSearchActive} setIsActive={setIsSearchActive} />

        <ul className="flex items-center space-x-1.5 lg:hidden">
          <li>
            <Link
              className="flex items-center space-x-2 px-2 text-sm transition-colors duration-200 hover:text-primary-2 dark:hover:text-primary-1"
              {...LINKS.documentation}
            >
              Documentation
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center space-x-2 px-2 text-sm transition-colors duration-200 hover:text-primary-2 dark:hover:text-primary-1"
              {...LINKS.github}
            >
              GitHub
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center space-x-2 px-2 text-sm transition-colors duration-200 hover:text-primary-2 dark:hover:text-primary-1"
              {...LINKS.discord}
            >
              Community
            </Link>
          </li>
          <span className="!mr-1.5 !ml-3 flex h-6 w-px bg-gray-10 dark:bg-gray-3" aria-hidden />
          <li>
            <ThemeSwitcher />
          </li>
        </ul>
      </div>
    </header>
  );
};

Header.propTypes = {
  isMobileMenuOpen: PropTypes.bool,
  onBurgerClick: PropTypes.func.isRequired,
};

Header.defaultProps = {
  isMobileMenuOpen: false,
};

export default Header;
