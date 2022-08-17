import clsx from 'clsx';
import copyToClipboard from 'copy-to-clipboard';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import ArrowIcon from 'icons/arrow.inline.svg';
import CopyIcon from 'icons/copy.inline.svg';

import Code from './code';

const ANIMATION_DURATION = 0.2;
const MOTION_EASY = [0.25, 0.1, 0.25, 1];

const variants = {
  hidden: {
    opacity: 0,

    transition: {
      duration: ANIMATION_DURATION,
      ease: MOTION_EASY,
    },
  },
  visible: {
    opacity: 1,

    transition: {
      duration: ANIMATION_DURATION,
      ease: MOTION_EASY,
    },
  },
};

const CodeSnippets = ({ className, title, items }) => {
  const [selectValue, setSelectValue] = useState(items[0].label);
  const [selectList, setSelectList] = useState([]);

  const [isCopied, setIsCopied] = useState(false);
  const [copyText, setCopyText] = useState(items[0].content);

  const handleCopy = () => {
    if (!isCopied) {
      copyToClipboard(copyText, { onCopy: setIsCopied(true) });
    }
  };

  const handleSelectChange = ({ target: { value } }) => {
    setSelectValue(value);
    setCopyText(items.find(({ label }) => label === value).content);
  };

  useEffect(() => {
    items.map(({ language, label }) => {
      if (!selectList.includes(language)) {
        setSelectList((prevLanguages) => [...prevLanguages, label]);
      }

      return null;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }
  }, [isCopied]);

  return (
    <div className={clsx('rounded-md border border-gray-10 dark:border-none', className)}>
      <div className="flex h-10 items-center justify-between space-x-1.5 rounded-t border-b border-gray-10 bg-white px-5 dark:border-none dark:bg-[#141414]">
        <span className="text-xs font-bold uppercase text-gray-2 dark:text-gray-8">{title}</span>

        <div className="flex flex-shrink-0 space-x-7">
          <div className="relative z-10 flex items-center">
            <select
              className="w-full appearance-none bg-transparent pr-4 text-sm text-gray-2 outline-none dark:text-gray-8"
              value={selectValue}
              onChange={handleSelectChange}
            >
              {selectList.map((label, index) => (
                <option value={label} key={index}>
                  {label}
                </option>
              ))}
            </select>
            <ArrowIcon className="absolute right-0 -z-10 mt-0.5 h-1.5 dark:text-gray-8" />
          </div>
          <button
            className="group relative flex items-center justify-center"
            type="button"
            aria-label="Copy"
            onClick={handleCopy}
          >
            <AnimatePresence>
              {isCopied && (
                <motion.span
                  className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-black py-1 px-1.5 text-xs font-normal capitalize text-white opacity-50 md:-ml-2"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={variants}
                >
                  Copied!
                </motion.span>
              )}
            </AnimatePresence>

            <CopyIcon className="h-5 text-gray-8 transition-opacity duration-200 group-hover:opacity-80" />
          </button>
        </div>
      </div>

      {items.map(({ language, label, content }, index) => (
        <Code language={language} content={content} isActive={selectValue === label} key={index} />
      ))}
    </div>
  );
};

CodeSnippets.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      language: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
};

CodeSnippets.defaultProps = {
  className: null,
};

export default CodeSnippets;
