import getValueForParameter from './get-value-for-parameter';

const generateResponses = (responses) => {
  const items = responses
    .map((response) => {
      const {
        schema: { properties, items },
      } = response;
      console.log(items);
      const props = properties || items?.properties;

      if (props) {
        return {
          label: `${response.status}`,
          language: 'json',
          content: `{
    ${Object.keys(props)
      .map((propertyName) => {
        const { type } = props[propertyName];

        return `${propertyName}: ${getValueForParameter(props[propertyName], type, propertyName)}`;
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
