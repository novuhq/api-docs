---
title: Novu Trigger event
id: post-/v1/events/trigger
type: snippets
---

```javascript label=Node.js
import { Novu } from '@novu/node';

export const novu = new Novu('<REPLACE_WITH_API_KEY_FROM_ADMIN_PANEL>');

await novu.trigger('<REPLACE_WITH_EVENT_NAME_FROM_ADMIN_PANEL>',
  {
    to: {
      subscriberId: '<USER_IDENTIFIER>',
      email: 'email@email.com',
      firstName: 'John',
      lastName: 'Doe',
    },
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
    "to": "to",
    "transactionId": "transactionId"
  }' \
https://api.novu.app/v1/events/trigger
```
