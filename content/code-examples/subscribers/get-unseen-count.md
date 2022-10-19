---
title: Novu get unseen count
id: get-/v1/subscribers/:subscriberId/notifications/unseen
type: snippets
---

```javascript label=Node.js
import { Novu } from '@novu/node';

export const novu = new Novu('<REPLACE_WITH_API_KEY_FROM_ADMIN_PANEL>');

await novu.subscribers.getUnseenCount(user.id, false);
```
