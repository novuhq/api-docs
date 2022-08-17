---
title: Test
id: post-/v1/events/trigger
type: snippets
---

```javascript label=Node.js
import fetch from 'node-fetch';

const response = await fetch('https://api.novu.app/v1/events/trigger', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer <YOUR_API_KEY>',
  },
  body: JSON.stringify({
    name: 'Novu',
    payload: {
      test: 'test',
    },
    to: 'to',
    transactionId: 'transactionId',
  }),
});
const body = await response.text();

console.log(body);
```

```bash label=cURL
curl -X POST \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <YOUR_API_KEY>' \
  -d '{
    "name": "Novu",
    "payload": {
      "test": "test"
    },
    "to": "to",
```

```python label=Python
import requests

response = requests.post('https://api.novu.app/v1/events/trigger', json={
  'name': 'Novu',
  'payload': {
    'test': 'test',
  },
  'to': 'to',
  'transactionId': 'transactionId',
}, headers={
  'Content-Type': 'application/json',
  'Authorization': 'Bearer <YOUR_API_KEY>',
})

print(response.text)
```

```ruby label=Ruby
require 'net/http'
require 'uri'

uri = URI.parse('https://api.novu.app/v1/events/trigger')
http = Net::HTTP.new(uri.host, uri.port)
request = Net::HTTP::Post.new(uri.request_uri)


request.body = JSON.generate({
  'name': 'Novu',
  'payload': {
    'test': 'test',
  },
  'to': 'to',
  'transactionId': 'transactionId',
})
request.content_type = 'application/json'


response = http.request(request)

puts response.body
```

```php label=PHP
<?php
$url = 'https://api.novu.app/v1/events/trigger';
$data = array(
  'name' => 'Novu',
  'payload' => array(
    'test' => 'test',
  ),
  'to' => 'to',
  'transactionId' => 'transactionId',
);

$options = array(
  'http' => array(
    'header'  => "Content-type: application/json\r\n"
    'method'  => 'POST',
    'content' => json_encode($data)
  )
);
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

if ($result === FALSE) { /* Handle error */ }

echo $result;
```

```go label=Go
package main

import (
  "fmt"
  "net/http"
  "os"
  "encoding/json"
)


func main() {
  url := "https://api.novu.app/v1/events/trigger"
  payload := map[string]string{
    "name": "Novu",
    "payload": "test",
    "to": "to",
  }
  jsonValue, _ := json.Marshal(payload)
  req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonValue))
  req.Header.Set("Content-Type", "application/json")
  client := &http.Client{}
  resp, err := client.Do(req)
  if err != nil {
    panic(err)
  }
  defer resp.Body.Close()
  fmt.Println("response Status:", resp.Status)
  fmt.Println("response Headers:", resp.Header)
  body, _ := ioutil.ReadAll(resp.Body)
  fmt.Println("response Body:", string(body))
}
```
