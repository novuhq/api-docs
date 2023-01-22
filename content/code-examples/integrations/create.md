---
title: Novu create an integration
id: post-/v1/integrations
type: snippets
---

```javascript label=Node.js
import { Novu } from '@novu/node';  
export const novu = new Novu('<REPLACE_WITH_API_KEY_FROM_ADMIN_PANEL>');
await novu.integrations.create('providerId', {
    credentials: credentials,
    active: true,
    channel: "channel",
    check: true
});
```