import PropTypes from 'prop-types';
import React from 'react';

import Code from 'components/shared/code';
import SectionWrapper from 'components/shared/section-wrapper';

const Overview = ({ id, title, baseUrl, content }) => (
  <SectionWrapper id={id}>
    <div>
      <h2 className="text-2xl font-medium leading-tight">{title}</h2>
      <div
        className="content mt-3 text-base font-book"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
    <div className="sm:mt-10">
      <Code language="bash" title="Base URL" content={baseUrl} />
    </div>
  </SectionWrapper>
);

Overview.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Overview;
