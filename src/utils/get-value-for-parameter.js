const getValueForParameter = (param, type, name) => {
  switch (type) {
    case 'string':
      if (param.example) {
        return `"${param.example}"`;
      }
      return `"${name}"`;
    case 'number':
      return 0;
    case 'boolean':
      if (param.example) {
        return param.example;
      }
      return true;
    case 'array':
      if (param.example) {
        return `[${JSON.stringify(param.example)}]`;
      }

      return `["${name}"]`;
    case 'object':
      if (param.example) {
        return JSON.stringify(param.example);
      }
      return `${name}`;
    default:
      return `"${name}"`;
  }
};

export default getValueForParameter;
