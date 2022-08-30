/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import getPathWithoutPrefix from 'utils/get-path-without-prefix';
import './src/styles/main.css';

// scrolling to the section when navigating the site
export const onRouteUpdate = ({ location }) => {
  const id = getPathWithoutPrefix(location.pathname);

  const section = id ? document.querySelector(`#${id}`) : null;
  const headerOffset = 60;

  if (section) {
    const offsetPosition = section.getBoundingClientRect().top - headerOffset;

    window.scrollTo({
      top: offsetPosition,
    });
  }
};
