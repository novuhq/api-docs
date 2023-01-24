---
title: Novu Update an integration
id: put-/v1/integrations/:integrationId
type: snippets
---

```javascript label=Node.js
import { Novu } from '@novu/node';  
export const novu = new Novu('<REPLACE_WITH_API_KEY_FROM_ADMIN_PANEL>');
await novu.integrations.update('integrationId', {
    active: true,
    credentials: credentials,
    check: true
});
```