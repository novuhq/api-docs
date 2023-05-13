import { buildPropertyFromAllOf } from './build-properties';
import getValueForParameter from './get-value-for-parameter';

const buildParameters = (parameters, addQuotes) =>
  Object.keys(parameters?.body?.properties)
    .map((name) => {
      const property = parameters.body.properties[name];
      const { type, allOf } = property;
      const escapedName = addQuotes ? `"${name}"` : `${name}`;
      if (allOf) {
        return buildPropertyFromAllOf(name, property, allOf);
      }

      return `${escapedName}: ${getValueForParameter(property, type, name)}`;
    })
    .filter((item) => !!item)
    .join(',\n    ');

const generateSnippets = ({ method, endpoint, parameters, url }) => [
  {
    label: 'Node.js',
    language: 'javascript',
    content: `import fetch from 'node-fetch';

const response = await fetch('${url}${endpoint}', {
  method: '${method.toUpperCase()}',
  ${
    method !== 'get' && parameters?.body?.properties
      ? `headers: {
    'Content-Type': 'application/json',
    'Authorization': 'ApiKey REPLACE_WITH_API_KEY',
  },
  body: JSON.stringify({
    ${buildParameters(parameters)},
  })`
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
    ${buildParameters(parameters, true)}
  }' \\\n`
        : ''
    }https://api.novu.co${endpoint}`,
  },
  {
    label: 'Python',
    language: 'python',
    content: `import requests

response = requests.${method.toLowerCase()}('${url}${endpoint}'${
      parameters?.body?.properties
        ? `, json={
    ${buildParameters(parameters, true)}\n` +
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

uri = URI.parse('${url}${endpoint}')
http = Net::HTTP.new(uri.host, uri.port)
request = Net::HTTP::Post.new(uri.request_uri)

request.body = '{
    ${parameters?.body?.properties ? buildParameters(parameters, true) : '[options]'}
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

$url = '${url}${endpoint}';
$data = array(
    ${parameters?.body?.properties ? buildParameters(parameters, true) : '[options]'}
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
  url := "${url}${endpoint}"
  data := map[string]string{
    ${parameters?.body?.properties ? buildParameters(parameters, true) : '[options]'}
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
