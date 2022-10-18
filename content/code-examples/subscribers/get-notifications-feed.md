---
title: Novu get notifications feed
id: get-/v1/subscribers/:subscriberId/notifications/feed
type: snippets
---

```javascript label=Node.js
import { Novu } from '@novu/node';

export const novu = new Novu('<REPLACE_WITH_API_KEY_FROM_ADMIN_PANEL>');

await novu.subscribers.getNotificationsFeed(user.id, {
    page: 0,
    seen: false,
    feedIdentifier
});
```
