/* eslint-disable react/prop-types */
import { graphql } from 'gatsby';
import React from 'react';

import ApiAuthorization from 'components/pages/api-reference/api-authorization';
import Overview from 'components/pages/api-reference/overview';
import Sections from 'components/pages/main/sections';
import Layout from 'components/shared/layout';
import SectionWithContent from 'components/shared/section-with-content';

const MainPage = ({
  data: {
    apiReferenceAllPages,
    apiReferenceOverview,
    apiReferenceApiAuthorization,
    apiReferenceClientLibraries,
    snippets,
    responses,
  },
  pageContext,
  location,
}) => {
  const menu = [
    {
      label: 'API Reference',
      path: 'api-reference',
      subItems: apiReferenceAllPages.nodes.map((page) => ({
        label: page.frontmatter.title,
        path: page.frontmatter.slug,
      })),
    },
    ...pageContext.menu,
  ];

  const apiReferencePages = {
    overview: {
      id: apiReferenceOverview.frontmatter.slug,
      title: apiReferenceOverview.frontmatter.title,
      baseUrl: apiReferenceOverview.frontmatter.baseUrl,
      content: apiReferenceOverview.html,
    },
    apiAuthorization: {
      id: apiReferenceApiAuthorization.frontmatter.slug,
      title: apiReferenceApiAuthorization.frontmatter.title,
      headerFormat: apiReferenceApiAuthorization.frontmatter.headerFormat,
      content: apiReferenceApiAuthorization.html,
    },
    clientLibraries: {
      id: apiReferenceClientLibraries.frontmatter.slug,
      title: apiReferenceClientLibraries.frontmatter.title,
      content: apiReferenceClientLibraries.html,
    },
  };

  return (
    <Layout pageContext={{ ...pageContext, menu }} location={location} seo={pageContext.seo}>
      {/* API Reference pages */}
      <Overview {...apiReferencePages.overview} />
      <ApiAuthorization {...apiReferencePages.apiAuthorization} />
      <SectionWithContent {...apiReferencePages.clientLibraries} />
      {/* Swagger pages */}
      <Sections
        sections={pageContext.sections}
        snippets={snippets.nodes}
        responses={responses.nodes}
      />
    </Layout>
  );
};

export const query = graphql`
  query {
    apiReferenceAllPages: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/pages/api-reference/" } }
      sort: { order: ASC, fields: frontmatter___sort }
    ) {
      nodes {
        frontmatter {
          title
          slug
        }
      }
    }

    apiReferenceOverview: markdownRemark(
      fileAbsolutePath: { regex: "/pages/api-reference/overview/" }
    ) {
      id
      frontmatter {
        title
        slug
        baseUrl
      }
      html
    }

    apiReferenceApiAuthorization: markdownRemark(
      fileAbsolutePath: { regex: "/pages/api-reference/api-authorization/" }
    ) {
      id
      frontmatter {
        title
        slug
        headerFormat
      }
      html
    }

    apiReferenceClientLibraries: markdownRemark(
      fileAbsolutePath: { regex: "/pages/api-reference/client-libraries/" }
    ) {
      id
      frontmatter {
        title
        slug
      }
      html
    }

    snippets: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/code-examples/" }
        frontmatter: { type: { eq: "snippets" } }
      }
    ) {
      nodes {
        frontmatter {
          id
        }
        htmlAst
      }
    }

    responses: allMarkdownRemark(
      filter: {
        fileAbsolutePath: { regex: "/code-examples/" }
        frontmatter: { type: { eq: "responses" } }
      }
    ) {
      nodes {
        frontmatter {
          id
        }
        htmlAst
      }
    }
  }
`;

export default MainPage;
