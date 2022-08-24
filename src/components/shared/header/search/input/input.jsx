import React, { useState, useEffect, useRef, useCallback } from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';

import SearchIcon from '../images/search.inline.svg';

import CommandKeyIcon from './images/command-key.inline.svg';
import ResetIcon from './images/reset.inline.svg';

export default connectSearchBox(({ refine, currentRefinement }) => {
  const ref = useRef(null);

  const [isFocus, setIsFocus] = useState(false);
  const [commandKeyIsPressed, setCommandKeyIsPressed] = useState(false);

  const handleKeyboardShortcut = useCallback(
    (e) => {
      if (e.keyCode === 91) {
        setCommandKeyIsPressed(true);
      }

      if (commandKeyIsPressed && e.keyCode === 75) {
        ref.current.focus();
      }

      return null;
    },
    [commandKeyIsPressed]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyboardShortcut);

    return () => window.removeEventListener('keydown', handleKeyboardShortcut);
  }, [handleKeyboardShortcut]);

  const reset = () => {
    refine('');
  };

  return (
    <form className="group relative flex h-10 items-center" onSubmit={(e) => e.preventDefault()}>
      <label className="sr-only" id="search-label" htmlFor="search-input">
        Search Box
      </label>

      <input
        className="remove-search-cancel-button absoulte h-full w-full cursor-pointer appearance-none overflow-hidden rounded-md border border-gray-9 bg-transparent px-8 pl-10 text-[16px] leading-none outline-none transition-colors duration-200 focus:border-[#0055ff] group-hover:border-[#0055ff] dark:border-gray-5 dark:focus:border-primary-1 dark:group-hover:border-primary-1"
        aria-label="Search"
        type="search"
        value={currentRefinement}
        placeholder="Search..."
        id="search-input"
        autoComplete="off"
        ref={ref}
        onChange={(e) => refine(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />

      <SearchIcon className="absolute left-3 h-4 text-black dark:text-white" />

      {!isFocus && (
        <div className="absolute right-2.5 flex space-x-1.5" aria-hidden>
          <span className="flex h-5 w-5 items-center justify-center rounded-[3px] border border-gray-10 bg-gray-11 dark:border-gray-5 dark:bg-gray-4">
            <CommandKeyIcon className="h-3 text-gray-4 dark:text-gray-9" />
          </span>
          <span className="flex h-5 w-5 items-center justify-center rounded-[3px] border border-gray-10 bg-gray-11 text-sm text-gray-4 dark:border-gray-5 dark:bg-gray-4 dark:text-gray-9">
            K
          </span>
        </div>
      )}

      {currentRefinement && (
        <button className="absolute right-0 p-2.5" type="button" onClick={reset}>
          <ResetIcon className="h-3.5" />
        </button>
      )}
    </form>
  );
});
