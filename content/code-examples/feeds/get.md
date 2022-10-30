---
title: Novu get feeds
id: get-/v1/feeds/
type: snippets
---

```javascript label=Node.js
import { Novu } from '@novu/node';

export const novu = new Novu('<REPLACE_WITH_API_KEY_FROM_ADMIN_PANEL>');

await novu.feeds.get();
```
```bash label=cURL
curl -X GET \
 -H "Content-Type: application/json" \
 -H "Authorization: ApiKey REPLACE_WITH_API_KEY" \
https://api.novu.co/v1/feeds
```