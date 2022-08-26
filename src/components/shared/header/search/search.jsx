import algoliasearch from 'algoliasearch/lite';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useRef, useState, useMemo, useEffect } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import { useClickAway } from 'react-use';

import SearchIcon from './images/search.inline.svg';
import Input from './input';
import Result from './result';

const indices = [{ name: process.env.GATSBY_ALGOLIA_INDEX_NAME, title: 'Pages' }];

const Search = ({ isActive, setIsActive }) => {
  const rootRef = useRef(null);

  const [query, setQuery] = useState();

  const searchClient = useMemo(
    () => algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY),
    []
  );

  const shouldShowResult = !!query?.length;

  useClickAway(rootRef, () => {
    setIsActive(false);
  });

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
  }, [isActive]);

  return (
    <>
      <button
        className="ml-3.5 hidden h-10 items-center justify-center rounded-md border border-gray-9 px-2 text-white dark:border-gray-5 lg:flex"
        type="button"
        onClick={() => setIsActive(true)}
      >
        <SearchIcon className="h-4 text-black dark:text-white" />
      </button>

      <div
        className={clsx(
          'absolute left-1/2 z-20 w-[338px] -translate-x-1/2 lg:left-0 lg:ml-0 lg:hidden lg:w-full lg:translate-x-0 lg:bg-white dark:lg:bg-black',
          {
            '!block': isActive,
          }
        )}
        ref={rootRef}
      >
        <InstantSearch
          searchClient={searchClient}
          indexName={indices[0].name}
          onSearchStateChange={({ query }) => setQuery(query)}
        >
          <Input isShowResult={shouldShowResult} isActive={isActive} setIsActive={setIsActive} />
          {shouldShowResult && isActive && <Result indices={indices} setIsActive={setIsActive} />}
        </InstantSearch>
      </div>
    </>
  );
};

Search.propTypes = {
  isActive: PropTypes.bool.isRequired,
  setIsActive: PropTypes.func.isRequired,
};

export default Search;
