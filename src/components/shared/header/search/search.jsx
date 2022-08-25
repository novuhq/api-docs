import algoliasearch from 'algoliasearch/lite';
import React, { useRef, useState, useMemo } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import { useClickAway } from 'react-use';

import Input from './input';
import Result from './result';

const indices = [{ name: process.env.GATSBY_ALGOLIA_INDEX_NAME, title: 'Pages' }];

const Search = () => {
  const rootRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const [query, setQuery] = useState();

  const searchClient = useMemo(
    () => algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY),
    []
  );

  const shouldShowResult = !!query?.length;

  useClickAway(rootRef, () => {
    setIsActive(false);
  });

  return (
    <div className="absolute left-1/2 w-full max-w-[338px] -translate-x-1/2" ref={rootRef}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <Input isShowResult={shouldShowResult} setIsActive={setIsActive} />
        {shouldShowResult && isActive && <Result indices={indices} />}
      </InstantSearch>
    </div>
  );
};

export default Search;
