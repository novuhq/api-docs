/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import getPathWithoutPrefix from 'utils/get-path-without-prefix';
import scrollToSection from 'utils/scroll-to-section';
import './src/styles/main.css';

export const onClientEntry = () => {
  const id = getPathWithoutPrefix(window.location.pathname);
  scrollToSection(id);
};
