---
title: Novu Cancel event
id: delete-/v1/events/trigger/:transactionId
type: snippets
---

```javascript label=Node.js
import { Novu } from '@novu/node';

export const novu = new Novu('<REPLACE_WITH_API_KEY_FROM_ADMIN_PANEL>');

await novu.events.cancel('transactionId');
```

```bash label=cURL
curl -X DELETE \
  -H "Content-Type: application/json" \
  -H "Authorization: ApiKey REPLACE_WITH_API_KEY" \
https://api.novu.co/v1/events/trigger/transactionId
```
