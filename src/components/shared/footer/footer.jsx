// import ButtonGithubStars from 'components/shared/button-github-stars';
import React from 'react';

import Link from 'components/shared/link';
import LINKS from 'constants/links';
import MENUS from 'constants/menus';
import GitHubIcon from 'icons/github.inline.svg';
import Logo from 'images/logo.inline.svg';

const COPYRIGHT = 'Novu';

const Footer = () => (
  <footer className="safe-paddings border-t border-gray-10 dark:border-gray-3">
    <div className="container flex justify-between py-20 lg:flex-col lg:py-12 sm:block sm:py-10">
      <div className="flex flex-col items-start justify-between lg:flex-row lg:items-center">
        <Link {...LINKS.home}>
          <span className="sr-only">Novu</span>
          <Logo className="h-8" aria-hidden />
        </Link>
        <p className="text-sm leading-none text-gray-8 lg:hidden">
          Ⓒ {new Date().getFullYear()} {COPYRIGHT}
        </p>
      </div>

      <div className="flex space-x-30 lg:mt-8 lg:grid lg:grid-cols-12 lg:justify-between lg:gap-x-7 lg:space-x-0 sm:mt-9 sm:block">
        <nav className="flex justify-between space-x-30 pt-1.5 lg:col-span-9 lg:w-full lg:justify-start lg:space-x-22 md:grid md:grid-cols-2 md:gap-y-5 md:space-x-0">
          {MENUS.footer.map((links, index) => (
            <ul className="space-y-2.5 lg:space-y-2 sm:space-y-1" key={index}>
              {links.map(({ to, text, target }, index) => (
                <li key={index}>
                  <Link
                    className="hover:text-primary-2 dark:hover:text-primary-1"
                    to={to}
                    size="base"
                    target={target}
                  >
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </nav>

        <div className="flex flex-col items-end justify-between lg:col-span-3 sm:mt-9 sm:items-start">
          <Link
            className="transition-[colors, opacity] inline-flex h-10 items-center justify-center whitespace-nowrap rounded border border-gray-9 bg-transparent px-5 pl-3 text-center text-xs font-medium uppercase !leading-none outline-none duration-200 hover:border-gray-4 hover:bg-gray-4 hover:text-white dark:border-gray-5"
            to="https://github.com/novuhq/novu"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon className="mr-2 h-[26px] w-[26px]" />
            <span>Star us on Github</span>
          </Link>

          <p className="text-sm leading-none text-gray-8 lg:hidden">
            Design made by{' '}
            <Link
              className="hover:text-primary-2 dark:hover:text-primary-1"
              rel="noopener"
              {...LINKS.pixelPoint}
            >
              Pixel Point
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:mt-8 lg:flex lg:justify-between sm:mt-9 sm:flex-col sm:space-y-2.5">
        <p className="text-sm leading-none text-gray-8">
          Ⓒ {new Date().getFullYear()} {COPYRIGHT}
        </p>
        <p className="text-sm leading-none text-gray-8">
          Design made by{' '}
          <Link
            className="hover:text-primary-2 dark:hover:text-primary-1"
            rel="noopener"
            {...LINKS.pixelPoint}
          >
            Pixel Point
          </Link>
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
