import getValueForParameter from './get-value-for-parameter';

const generateSnippets = ({ method, endpoint, parameters }) => [
  {
    label: 'Node.js',
    language: 'javascript',
    content: `import fetch from 'node-fetch';

const response = await fetch('https://api.novu.co${endpoint}', {
  method: '${method.toUpperCase()}',
  ${
    method !== 'get' && parameters?.body?.properties
      ? `headers: {
    'Content-Type': 'application/json',
    'Authorization': 'ApiKey REPLACE_WITH_API_KEY',
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
    content: `curl -X ${method.toUpperCase()} \\\n -H "Authorization: ApiKey REPLACE_WITH_API_KEY" \\\n${
      parameters?.body?.properties
        ? ` -H "Content-Type: application/json" \\\n -d ` +
          `'{
      ${Object.keys(parameters?.body?.properties)
        .map((name) => {
          const { type } = parameters.body.properties[name];
          return `"${name}": ${getValueForParameter(parameters.body.properties[name], type, name)}`;
        })
        .filter((item) => !!item)
        .join(',\n      ')}
    }' \\\n`
        : ''
    }https://api.novu.co${endpoint}`,
  },
  {
    label: 'Python',
    language: 'python',
    content: `import requests

response = requests.${method.toLowerCase()}('https://api.novu.co${endpoint}'${
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
    'Authorization': 'ApiKey REPLACE_WITH_API_KEY'
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

uri = URI.parse('https://api.novu.co${endpoint}')
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
request.add_field('Authorization', 'ApiKey REPLACE_WITH_API_KEY')


response = http.request(request)

puts response.body
    `,
  },

  {
    label: 'PHP',
    language: 'php',
    content: `<?php

$url = 'https://api.novu.co${endpoint}';
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
  "header"  => "Authorization: ApiKey REPLACE_WITH_API_KEY",
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
  url := "https://api.novu.co${endpoint}"
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
  req, _ := http.NewRequest("${method.toUpperCase()}", url, bytes.NewBuffer(jsonValue))
  req.Header.Set("Content-Type", "application/json")
  req.Header.Set("Authorization", "ApiKey REPLACE_WITH_API_KEY")

  defer resp.Body.Close()
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println(string(body))
}
    `,
  },
];

export default generateSnippets;
