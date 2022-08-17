import PropTypes from 'prop-types';
import React from 'react';

import SectionWrapper from 'components/shared/section-wrapper';

const ClientLibraries = ({ id, title, content }) => (
  <SectionWrapper id={id}>
    <div className="flex-1">
      <h2 className="text-2xl font-medium leading-tight">{title}</h2>
      <div
        className="content mt-3 text-base font-book"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  </SectionWrapper>
);

ClientLibraries.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default ClientLibraries;
