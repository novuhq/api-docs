---
title: Novu mark message action seen
id: post-/v1/subscribers/:subscriberId/messages/:messageId/actions/:type
type: snippets
---

```javascript label=Node.js
import { Novu } from '@novu/node';

export const novu = new Novu('<REPLACE_WITH_API_KEY_FROM_ADMIN_PANEL>');

await novu.subscribers.markMessageActionSeen(user.id, messageId, type);
```
