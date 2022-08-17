import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import Footer from 'components/shared/footer';
import Header from 'components/shared/header';
import SEO from 'components/shared/seo';

import Navigation from '../navigation';

const Layout = ({ children, pageContext, location }) => {
  const handleChangeUrl = (customEvent) => () => {
    const sections = document.querySelectorAll('main > section');
    const offsetTop = window.pageYOffset;

    sections.forEach((section) => {
      const headerHeight = document.querySelector('header').offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionBottom = sectionTop + sectionHeight;

      if (
        offsetTop + headerHeight >= sectionTop &&
        offsetTop + headerHeight < sectionBottom &&
        window.history.state?.id !== section.id
      ) {
        window.history.replaceState(
          {
            id: section.id,
          },
          '',
          `#${section.id}`
        );
        window.dispatchEvent(customEvent);
      }

      return null;
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const customEvent = new Event('changeUrl');

      window.addEventListener('scroll', handleChangeUrl(customEvent));

      return () => {
        window.removeEventListener('scroll', handleChangeUrl(customEvent));
      };
    }

    return null;
  }, []);

  return (
    <>
      <SEO />
      <Header menuItems={pageContext.menu} />
      <div className="container flex">
        <Navigation items={pageContext.menu} location={location} />
        <div className="min-w-0 max-w-none flex-auto pb-16 pt-16 pl-8 lg:pl-0">
          <main>{children}</main>
        </div>
      </div>

      <Footer />
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageContext: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Layout;
