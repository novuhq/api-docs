---
title: Novu broadcast event
id: post-/v1/events/trigger/broadcast
type: snippets
---

```javascript label=Node.js
import { Novu } from '@novu/node';

export const novu = new Novu('<REPLACE_WITH_API_KEY_FROM_ADMIN_PANEL>');

await novu.broadcast('<REPLACE_WITH_EVENT_NAME_FROM_ADMIN_PANEL>',
  {
    payload: {
      customVariables: 'Hello'
    },
    transactionId: 'transactionId',
  }
);
```

```bash label=cURL
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: ApiKey REPLACE_WITH_API_KEY" \
  -d '{
    "name": "Novu",
    "payload": {
      "test": "test"
    },
    "transactionId": "transactionId"
  }' \
https://api.novu.app/v1/events/trigger/brodcast
```
