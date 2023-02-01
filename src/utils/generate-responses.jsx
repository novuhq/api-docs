import { buildPropertyFromAllOf, buildProperty } from './build-properties';

const renderProperties = (properties) =>
  Object.keys(properties).map((propertyName) => {
    const property = properties[propertyName];

    if (property.allOf) {
      return buildPropertyFromAllOf(propertyName, property, property.allOf);
    }

    return buildProperty(propertyName, property);
  });

const buildContent = (properties) =>
  `{
    ${renderProperties(properties)}
}`;

const generateResponses = (responses) => {
  const items = responses
    .map((response) => {
      if (!response.schema) {
        return null;
      }

      const {
        schema: { properties, items },
      } = response;

      const props = properties || items?.properties;

      if (props) {
        return {
          label: `${response.status}`,
          language: 'json',
          content: buildContent(props),
        };
      }

      return null;
    })
    .filter((item) => !!item);

  return items;
};

export default generateResponses;
