import getValueForParameter from './get-value-for-parameter';

const generateResponses = (responses) => {
  const items = responses
    .map((response) => {
      const {
        schema: { properties },
      } = response;

      if (properties) {
        return {
          label: `${response.status}`,
          language: 'json',
          content: `{
    ${Object.keys(properties)
      .map((propertyName) => {
        const { type } = properties[propertyName];

        return `${propertyName}: ${getValueForParameter(properties, type, propertyName)}`;
      })
      .join(',\n    ')}
}`,
        };
      }

      return null;
    })
    .filter((item) => !!item);

  return items;
};

export default generateResponses;
