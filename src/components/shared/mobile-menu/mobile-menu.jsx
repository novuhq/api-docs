import clsx from 'clsx';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import Link from 'components/shared/link';

const ANIMATION_DURATION = 0.2;

const variants = {
  hidden: {
    opacity: 0,
    translateX: '-100%',
    transition: {
      duration: ANIMATION_DURATION,
    },
  },
  visible: {
    zIndex: 10,
    opacity: 1,
    translateX: 0,
    transition: {
      duration: ANIMATION_DURATION,
    },
  },
};

const MobileMenu = ({ menuItems, activePath, isOpen, setIsOpen }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
  }, [isOpen, controls]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.span
            className="fixed inset-0 bg-[rgba(0,0,0,.6)]"
            initial={{
              opacity: 0,
              transition: {
                duration: ANIMATION_DURATION,
              },
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: ANIMATION_DURATION,
              },
            }}
            exit="initial"
            aria-hidden
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            className="safe-paddings fixed inset-0 flex h-full w-[85vw] bg-white pt-16 dark:bg-black sm:pt-[60px]"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
          >
            <nav
              className="flex h-full max-h-screen w-full overflow-x-hidden overflow-y-scroll pr-2 pl-10 md:pl-7 sm:pl-4"
              id="mobile-navigation"
            >
              <ul className="mt-3.5 w-full space-y-5">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <h3 className="text-sm font-medium uppercase leading-tight">{item.label}</h3>
                    <ul className="mt-2.5">
                      {item.subItems.map((link, index) => (
                        <li className="relative" data-path={link.path} key={index}>
                          <Link
                            className={clsx(
                              'block w-full px-2.5 py-2.5 text-sm font-book leading-snug text-gray-4 transition-colors duration-200 dark:text-gray-10',
                              link.path === activePath
                                ? 'bg-[rgba(0,85,255,0.08)] !font-medium text-primary-2 dark:bg-[rgba(0,213,255,0.12)] dark:!text-primary-1'
                                : 'hover:bg-[rgba(0,85,255,0.08)] hover:text-primary-2 dark:hover:bg-[rgba(0,213,255,0.12)] dark:hover:text-primary-1'
                            )}
                            to={`/${link.path}/`}
                            onClick={() => setIsOpen(false)}
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
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

MobileMenu.propTypes = {
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
  activePath: PropTypes.string.isRequired,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func.isRequired,
};

MobileMenu.defaultProps = {
  isOpen: false,
};

export default MobileMenu;
