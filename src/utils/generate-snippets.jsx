import getValueForParameter from './get-value-for-parameter';

const generateSnippets = ({ method, endpoint, parameters }) => [
  {
    label: 'Node.js',
    language: 'javascript',
    content: `import fetch from 'node-fetch';

const response = await fetch('https://api.novu.app${endpoint}', {
  method: '${method.toUpperCase()}',
  ${
    method !== 'get' && parameters?.body?.properties
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
    `,
  },
  {
    label: 'cURL',
    language: 'bash',
    content: `curl -X ${method.toUpperCase()}
    ${
      parameters?.body?.properties
        ? `-H "Content-Type: application/json"
    -d ` +
          `'{
      ${Object.keys(parameters?.body?.properties)
        .map((name) => {
          const { type } = parameters.body.properties[name];
          return `"${name}": ${getValueForParameter(parameters.body.properties[name], type, name)}`;
        })
        .filter((item) => !!item)
        .join(',\n      ')}
      }'    
    `
        : ''
    }
  https://api.novu.app${endpoint}`,
  },
  {
    label: 'Python',
    language: 'python',
    content: `import requests

response = requests.${method.toLowerCase()}('https://api.novu.app${endpoint}'${
      parameters?.body?.properties
        ? `, json={
      ${Object.keys(parameters?.body?.properties)
        .map((name) => {
          const { type } = parameters.body.properties[name];
          return `"${name}": ${getValueForParameter(
            parameters.body.properties[name],
            type,
            name
          )},`;
        })
        .filter((item) => !!item)
        .join(',\n      ')}\n` +
          `}, headers={
    'Content-Type': 'application/json'
}`
        : ''
    })

print(response.json())
    `,
  },
  {
    label: 'Ruby',
    language: 'ruby',
    content: `require 'net/http'
require 'uri'

uri = URI.parse('https://api.novu.app${endpoint}')
http = Net::HTTP.new(uri.host, uri.port)
request = Net::HTTP::Post.new(uri.request_uri)

request.body = '{
  ${
    parameters?.body?.properties
      ? Object.keys(parameters?.body?.properties)
          .map((name) => {
            const { type } = parameters.body.properties[name];
            return `"${name}": ${getValueForParameter(
              parameters.body.properties[name],
              type,
              name
            )}`;
          })
          .filter((item) => !!item)
          .join(',\n  ')
      : '[options]'
  }
}'
request.content_type = 'application/json'


response = http.request(request)

puts response.body
    `,
  },

  {
    label: 'PHP',
    language: 'php',
    content: `<?php

$url = 'https://api.novu.app${endpoint}';
$data = array(
  ${
    parameters?.body?.properties
      ? Object.keys(parameters?.body?.properties)
          .map((name) => {
            const { type } = parameters.body.properties[name];
            return `"${name}": ${getValueForParameter(
              parameters.body.properties[name],
              type,
              name
            )}`;
          })
          .filter((item) => !!item)
          .join(',\n  ')
      : '[options]'
  }
);
$options = array(
  "http" => array(
  "header"  => "Content-type: application/json",
  "method"  => "${method.toUpperCase()}",
  "content" => json_encode($data)
  )
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

if ($result === FALSE) { /* Handle error */ }

echo $result;
    `,
  },
  {
    label: 'Go',
    language: 'go',
    content: `package main

import (
  "fmt"
  "net/http"
  "encoding/json"
)

func main() {
  url := "https://api.novu.app${endpoint}"
  data := map[string]string{
    ${
      parameters?.body?.properties
        ? Object.keys(parameters?.body?.properties)
            .map((name) => {
              const { type } = parameters.body.properties[name];
              return `"${name}": ${getValueForParameter(
                parameters.body.properties[name],
                type,
                name
              )}`;
            })
            .filter((item) => !!item)
            .join(',\n    ')
        : '[options]'
    }
  }
  jsonValue, _ := json.Marshal(data)
  resp, _ := http.Post(url, "application/json", bytes.NewBuffer(jsonValue))
  defer resp.Body.Close()
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println(string(body))
}
    `,
  },
];

export default generateSnippets;
