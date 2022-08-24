/* eslint-disable react/prop-types */
import { motion, useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Index, connectHits, connectStateResults, Highlight } from 'react-instantsearch-dom';

import Link from 'components/shared/link';

import AlgoliaLogo from './images/algolia.inline.svg';

const DEFAULT_EASE = [0.5, 0.5, 0.5, 1];

const underlineVariants = {
  initial: {
    right: 0,
    left: 'auto',
    width: '100%',
    scaleX: -1,
  },
  start: {
    right: 0,
    left: 'auto',
    width: 0,
    scaleX: -1,
    transition: {
      duration: 0.25,
      ease: DEFAULT_EASE,
    },
    transitionEnd: {
      right: 'auto',
      left: 0,
      scaleX: 1,
    },
  },
  finish: {
    width: '100%',
    transition: {
      duration: 0.25,
      ease: DEFAULT_EASE,
    },
    transitionEnd: {
      right: 0,
      left: 'auto',
      scaleX: -1,
    },
  },
};

const HitCount = connectStateResults(({ searchResults }) => {
  const hitCount = searchResults?.nbHits;
  const query = searchResults?.query;
  return (
    <div className="px-3 py-2.5 text-xs">
      <span className="text-gray-8">
        {hitCount || 'No'} result{hitCount !== 1 || hitCount === 0 ? `s` : ``} for
      </span>{' '}
      &quot;{query}&quot;
    </div>
  );
});

const Hits = connectHits(({ hits, showAll }) =>
  hits?.length ? (
    <ul className="divide-y divide-gray-3 px-3">
      {hits.slice(0, showAll ? hits.length : 5).map((hit) => (
        <li className="py-2.5 first:pt-1.5" key={hit.objectID}>
          <Link className="group" to={`#${hit.slug}`}>
            <h4 className="group-hover:text-primary-2 text-sm font-bold transition-colors duration-200">
              <Highlight attribute="title" hit={hit} tagName="mark" />
            </h4>
            <p className="mt-1.5 block text-xs">
              <Highlight attribute="excerpt" hit={hit} tagName="mark" />
            </p>
          </Link>
        </li>
      ))}
    </ul>
  ) : null
);

const HitsInIndex = ({ index, allResultsShown }) => (
  <Index indexName={index.name}>
    <HitCount />
    <Hits showAll={allResultsShown} />
  </Index>
);

const Result = ({ indices }) => {
  const [canAnimate, setCanAnimate] = useState(true);
  const controls = useAnimation();

  const handleHover = () => {
    if (!canAnimate) return;

    setCanAnimate(false);

    controls.start('start').then(() => controls.start('finish').then(() => setCanAnimate(true)));
  };

  const [allResultsShown, setAllResultsShown] = useState(false);

  const handleAllResultsClick = () => {
    setAllResultsShown(!allResultsShown);

    if (!canAnimate) return;

    setCanAnimate(false);

    controls.start('start').then(() => controls.start('finish').then(() => setCanAnimate(true)));
  };
  return (
    <div className="card-shadow pointer-events-auto visible absolute inset-x-0 top-full z-50 w-full rounded-b border border-t-0 border-gray-2 bg-white opacity-100 transition-[opacity,visibility] duration-200">
      <div className="max-h-[50vh] overflow-y-scroll sm:max-h-[70vh]">
        {indices.map((index) => (
          <HitsInIndex allResultsShown={allResultsShown} index={index} key={index.name} />
        ))}
      </div>
      <div className="flex rounded-b border-t border-gray-5 p-3">
        {!allResultsShown && (
          <button
            className="hover:text-primary-2 relative flex pb-1.5 text-xs font-bold uppercase leading-none transition-colors duration-200"
            type="button"
            onClick={handleAllResultsClick}
            onMouseEnter={handleHover}
          >
            View all
            <motion.span
              className="bg-primary-2 absolute bottom-0 left-0 h-0.5 w-full rounded-full"
              initial="initial"
              variants={underlineVariants}
              animate={controls}
              aria-hidden
            />
          </button>
        )}
        <Link
          className="group ml-auto inline-flex items-center space-x-2"
          to="https://www.algolia.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="text-xs leading-none text-gray-8 transition-colors duration-200 group-hover:text-black">
            Search By Algolia
          </span>
          <AlgoliaLogo className="h-4 shrink-0" />
        </Link>
      </div>
    </div>
  );
};

Result.propTypes = {
  indices: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      hitComp: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Result;
