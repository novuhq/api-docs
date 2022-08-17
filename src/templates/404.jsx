/* eslint-disable react/prop-types */
import React from 'react';

import Layout from 'components/shared/layout';
import Link from 'components/shared/link';

const NotFoundPage = ({ pageContext, location }) => (
  <Layout pageContext={pageContext} location={location}>
    <section className="safe-paddings py-16 md:py-32">
      <div className="container">
        <p className="font-semibold uppercase">404 error</p>
        <h1 className="leading-denser text-6xl font-bold">Page not found</h1>
        <p className="mt-2">Sorry, we couldn’t find the page you’re looking for.</p>
        <div className="mt-6">
          <Link to="/" size="sm" theme="black-underline">
            Go back home
          </Link>
        </div>
      </div>
    </section>
  </Layout>
);

export default NotFoundPage;
