import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';

import Footer from 'components/shared/footer';
import Header from 'components/shared/header';
import MobileMenu from 'components/shared/mobile-menu';
import Navigation from 'components/shared/navigation';
import SEO from 'components/shared/seo';
import getPathWithoutPrefix from 'utils/get-path-without-prefix';

const Layout = ({ seo, children, pageContext, location }) => {
  const [activePath, setActivePath] = useState(getPathWithoutPrefix(location.pathname));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleHeaderBurgerClick = () => setIsMobileMenuOpen((prevState) => !prevState);

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
          `/api/${section.id}/`
        );
        window.dispatchEvent(customEvent);
      }

      return null;
    });
  };

  const handleScrollToActiveNavItem = (path, navigationType) => {
    const container =
      navigationType === 'desktop'
        ? document.querySelector('#navigation')
        : document.querySelector('#mobile-navigation');
    const item = container.querySelector(`li[data-path="${path}"]`);

    if (!container || !item) return;

    const containerRect = container.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    container.scrollTop += itemRect.top - containerRect.top - 200;
  };

  const handleChangeActiveNavItem = useCallback((navigationType) => {
    const path = getPathWithoutPrefix(window.location.pathname);

    setActivePath(path);
    handleScrollToActiveNavItem(path, navigationType);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const customEvent = new Event('changeUrl');

      handleChangeActiveNavItem('desktop');

      window.addEventListener('scroll', handleChangeUrl(customEvent));
      window.addEventListener('changeUrl', () => handleChangeActiveNavItem('desktop'));

      return () => {
        window.removeEventListener('scroll', handleChangeUrl(customEvent));
        window.removeEventListener('changeUrl', () => handleChangeActiveNavItem('desktop'));
      };
    }

    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleChangeActiveNavItem]);

  useEffect(() => {
    if (typeof window !== 'undefined' && isMobileMenuOpen) {
      handleChangeActiveNavItem('mobile');
    }

    return null;
  }, [isMobileMenuOpen, handleChangeActiveNavItem]);

  return (
    <>
      <SEO {...seo} />
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        menuItems={pageContext.menu}
        onBurgerClick={handleHeaderBurgerClick}
      />
      <div className="container flex">
        <Navigation items={pageContext.menu} activePath={activePath} />
        <div className="min-w-0 max-w-none flex-auto pb-16 pt-16 pl-8 lg:pl-0">
          <main>{children}</main>
        </div>
      </div>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        menuItems={pageContext.menu}
        activePath={activePath}
        setIsOpen={setIsMobileMenuOpen}
      />
      <Footer />
    </>
  );
};

Layout.propTypes = {
  seo: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  children: PropTypes.node.isRequired,
  pageContext: PropTypes.objectOf(PropTypes.any).isRequired,
  location: PropTypes.objectOf(PropTypes.any).isRequired,
};

Layout.defaultProps = {
  seo: null,
};

export default Layout;
