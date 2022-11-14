---
title: Novu create feeds template
id: post-/v1/feeds/:name
type: snippets
---

```javascript label=Node.js
import { Novu } from '@novu/node';

export const novu = new Novu('<REPLACE_WITH_API_KEY_FROM_ADMIN_PANEL>');

await novu.feeds.create({
    name: "name"
});
```
```bash label=cURL
curl -X POST \
 -H "Authorization: ApiKey REPLACE_WITH_API_KEY" \
 -H "Content-Type: application/json" \
 -d '{
      "name": "name"
    }' \
https://api.novu.co/v1/feeds
```