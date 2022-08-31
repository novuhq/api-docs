import PropTypes from 'prop-types';
import React from 'react';

import CodeSnippets from 'components/shared/code-snippets';
import MethodWithEndpoint from 'components/shared/method-with-endpoint';
import ParametrWithType from 'components/shared/parametr-with-type';
import { ResponseCode, RESPONSE_CODE_THEMES } from 'components/shared/response-code';
import SectionWrapper from 'components/shared/section-wrapper';
import generateResponses from 'utils/generate-responses';
import generateSnippets from 'utils/generate-snippets';

const getFilteredDataForSection = (id, snippets, responses) => {
  const filteredSnippets = snippets.filter(({ frontmatter }) => frontmatter.id === id);
  const filteredResponses = responses.filter(({ frontmatter }) => frontmatter.id === id);

  return {
    snippets: filteredSnippets[0]?.htmlAst?.children
      .filter(({ children }) => children && children[0].tagName === 'code')
      .map((item) => ({
        label: item.children[0].properties.dataMeta.split('=')[1],
        language: item.children[0].properties.className[0].split('-')[1],
        content: item.children[0].children[0].value,
      })),
    responses: filteredResponses[0]?.htmlAst?.children
      .filter(({ children }) => children && children[0].tagName === 'code')
      .map((item) => ({
        label: item.children[0].properties.dataMeta.split('=')[1],
        language: item.children[0].properties.className[0].split('-')[1],
        content: item.children[0].children[0].value,
      })),
  };
};

const Sections = ({ sections, snippets, responses }) =>
  sections.map(({ methods }) =>
    methods.map((method) => {
      const data = getFilteredDataForSection(method.id, snippets, responses);
      const defaultSnippets = generateSnippets(method);
      const defaultResponses = generateResponses(method.responses);

      return (
        <SectionWrapper id={method.slug} key={method.slug}>
          <div className="flex-1">
            <h2 className="text-2xl font-medium leading-tight">{method.summary}</h2>
            <p className="mt-3 text-base font-book">{method.description}</p>
            <div className="mt-8">
              <h3 className="text-xl font-medium leading-tight">Endpoint</h3>

              <MethodWithEndpoint
                className="mt-4"
                method={method.method}
                endpoint={method.endpoint}
              />
            </div>
            {!!method.parameters.path.length && (
              <div className="mt-8">
                <h3 className="text-xl font-medium leading-tight">Path parameters</h3>

                <ul className="mt-5 border-t border-gray-10 dark:border-gray-4">
                  {method.parameters.path.map(
                    ({ name, schema: { type }, required, description }, index) => (
                      <ParametrWithType
                        name={name}
                        type={type}
                        isRequired={required}
                        description={description}
                        key={index}
                      />
                    )
                  )}
                </ul>
              </div>
            )}
            {!!method.parameters.query.length && (
              <div className="mt-8">
                <h3 className="text-xl font-medium leading-tight">Query parameters</h3>

                <ul className="mt-5 border-t border-gray-10 dark:border-gray-4">
                  {method.parameters.query.map(
                    ({ name, schema: { type }, required, description }, index) => (
                      <ParametrWithType
                        name={name}
                        type={type}
                        isRequired={required}
                        description={description}
                        key={index}
                      />
                    )
                  )}
                </ul>
              </div>
            )}
            {!!method.parameters.body?.properties && (
              <div className="mt-8">
                <h3 className="text-xl font-medium leading-tight">Body parameters</h3>

                <ul className="mt-5 border-t border-gray-10 dark:border-gray-4">
                  {Object.keys(method.parameters.body.properties).map((propertyName, index) => {
                    const { type, description, properties, items } =
                      method.parameters.body.properties[propertyName];

                    return (
                      <ParametrWithType
                        name={propertyName}
                        type={type}
                        isRequired={method.parameters.body.required?.includes(propertyName)}
                        description={description}
                        subParameters={properties || items?.properties}
                        key={index}
                        {...method.parameters.body.properties[propertyName]}
                      />
                    );
                  })}
                </ul>
              </div>
            )}
            <div className="mt-8">
              <h3 className="text-xl font-medium leading-tight">Responses</h3>

              <ul className="mt-5">
                {method.responses.map(({ status, description, schema }, index) => (
                  <li className="border-t border-gray-10 dark:border-gray-4" key={index}>
                    <ResponseCode
                      code={status}
                      description={description}
                      theme={
                        status.charAt(0) === '2'
                          ? RESPONSE_CODE_THEMES.green
                          : RESPONSE_CODE_THEMES.red
                      }
                      schema={schema}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative sm:mt-10">
            <div className="sticky top-16">
              {data.snippets && (
                <CodeSnippets
                  className="w-full"
                  method={method.method}
                  endpoint={method.endpoint}
                  items={data.snippets}
                />
              )}

              {!data.snippets && !!defaultSnippets.length && (
                <CodeSnippets
                  className="w-full"
                  method={method.method}
                  endpoint={method.endpoint}
                  items={defaultSnippets}
                />
              )}

              {data.responses && (
                <CodeSnippets className="mt-10 w-full" title="Response" items={data.responses} />
              )}

              {!data.responses && !!defaultResponses.length && (
                <CodeSnippets className="mt-10 w-full" title="Response" items={defaultResponses} />
              )}
            </div>
          </div>
        </SectionWrapper>
      );
    })
  );

Sections.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      endpoint: PropTypes.string.isRequired,
      methods: PropTypes.arrayOf(
        PropTypes.shape({
          description: PropTypes.string.isRequired,
          endpoint: PropTypes.string.isRequired,
          id: PropTypes.string.isRequired,
          method: PropTypes.string.isRequired,
          parameters: PropTypes.shape({
            body: PropTypes.objectOf(
              PropTypes.shape({
                required: PropTypes.arrayOf(PropTypes.string),
                type: PropTypes.string,
                properties: PropTypes.objectOf(PropTypes.any),
              })
            ),
            path: PropTypes.arrayOf(
              PropTypes.shape({
                description: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                required: PropTypes.bool.isRequired,
                type: PropTypes.string.isRequired,
              })
            ),
            query: PropTypes.arrayOf(
              PropTypes.shape({
                description: PropTypes.string.isRequired,
                name: PropTypes.string.isRequired,
                required: PropTypes.bool.isRequired,
                type: PropTypes.string.isRequired,
              })
            ),
          }).isRequired,
          summary: PropTypes.string.isRequired,
          responses: PropTypes.objectOf(PropTypes.any),
        })
      ),
    })
  ).isRequired,
  snippets: PropTypes.arrayOf(
    PropTypes.shape({
      frontmatter: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
      htmlAst: PropTypes.objectOf(PropTypes.any).isRequired,
    })
  ).isRequired,
  responses: PropTypes.arrayOf(
    PropTypes.shape({
      frontmatter: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
      htmlAst: PropTypes.objectOf(PropTypes.any).isRequired,
    })
  ).isRequired,
};

export default Sections;
