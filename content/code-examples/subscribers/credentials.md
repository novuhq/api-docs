---
title: Novu subscriber set credentials
id: put-/v1/subscribers/:subscriberId/credentials
type: snippets
---

```javascript label=Node.js
import { Novu } from '@novu/node';

export const novu = new Novu('<REPLACE_WITH_API_KEY_FROM_ADMIN_PANEL>');

await novu.subscribers.setCredentials(user.id, 'fcm', {
  webhookUrl: 'http://webhook.url/novu';
  notificationIdentifiers: [user.notificationIdentifier]
});
```
