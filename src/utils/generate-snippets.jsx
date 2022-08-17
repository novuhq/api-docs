import getValueForParameter from './get-value-for-parameter';

const generateSnippets = ({ method, endpoint, parameters }) => [
  {
    label: 'Node.js',
    language: 'javascript',
    content: `import fetch from 'node-fetch';

const response = await fetch('https://api.novu.app${endpoint}', {
  method: '${method.toUpperCase()}',
  ${
    method !== 'get' && parameters?.body
      ? `headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    ${Object.keys(parameters?.body?.properties)
      .map((name) => {
        const { type } = parameters.body.properties[name];
        return `${name}: ${getValueForParameter(parameters.body.properties[name], type, name)}`;
      })
      .filter((item) => !!item)
      .join(',\n    ')}
  }),`
      : ''
  }
});
const data = await response.json();

console.log(data);
    `,
  },
  {
    label: 'cURL',
    language: 'bash',
    content: `curl -X POST ${
      parameters?.body
        ? Object.keys(parameters?.body?.properties).map((name) => {
            const { type } = parameters.body.properties[name];
            return `-d ${name}=${getValueForParameter(
              parameters.body.properties[name],
              type,
              name
            )}`;
          })
        : '[options]'
    } https://api.novu.app${endpoint}`,
  },
  {
    label: 'Python',
    language: 'python',
    content: `import requests ${
      parameters?.body
        ? `

data = {
  ${Object.keys(parameters?.body?.properties)
    .map((name) => {
      const { type } = parameters.body.properties[name];
      return `${name}: ${getValueForParameter(parameters.body.properties[name], type, name)}`;
    })
    .join(',\n  ')},  
}

response = requests.${method.toLowerCase()}('https://api.novu.app${endpoint}', data)

print(response.json())
`
        : ''
    }`,
  },
];

export default generateSnippets;
