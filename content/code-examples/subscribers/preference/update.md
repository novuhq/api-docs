---
title: Novu get subscriber preferences
id: post-/v1/subscribers/:subscriberId/preferences/:templateId
type: snippets
---

```javascript label=Node.js
import { Novu } from '@novu/node';
export const novu = new Novu('<REPLACE_WITH_API_KEY_FROM_ADMIN_PANEL>');

await novu.subscribers.updatePreference(user.id, templateId, {
  channel: {
    type: 'fcm',
    enabled: true,
  },
  enabled: true,
});
```
