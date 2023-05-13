import getValueForParameter from './get-value-for-parameter';

export const buildProperty = (propertyName, property) => `
    ${propertyName}: ${getValueForParameter(property, property.type, propertyName)}`;

export const buildPropertyFromAllOf = (propertyName, property, allOf) => {
  const { properties } = allOf[0];

  const renderedProperties = Object.keys(properties).map((propertyName) => {
    const property = properties[propertyName];

    if (property.allOf) {
      return buildPropertyFromAllOf(propertyName, property, property.allOf);
    }

    return buildProperty(propertyName, property);
  });

  return `
  ${propertyName}: {${renderedProperties}
  }`;
};
