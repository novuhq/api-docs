import algoliasearch from 'algoliasearch/lite';
import React, { useRef, useState, useMemo } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';

import Input from './input';
import Result from './result';

const indices = [{ name: process.env.GATSBY_ALGOLIA_INDEX_NAME, title: 'Pages' }];

const Search = () => {
  const rootRef = useRef(null);

  const [query, setQuery] = useState();

  const searchClient = useMemo(
    () => algoliasearch(process.env.GATSBY_ALGOLIA_APP_ID, process.env.GATSBY_ALGOLIA_SEARCH_KEY),
    []
  );

  const shouldShowResult = !!query?.length;

  return (
    <div className="relative w-full max-w-[338px]" ref={rootRef}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <Input />
        {shouldShowResult && <Result indices={indices} />}
      </InstantSearch>
    </div>
  );
};

export default Search;
