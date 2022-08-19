---
title: Novu delete subscriber
id: delete-/v1/subscribers/:subscriberId
type: snippets
---

```javascript label=Node.js
import { Novu } from '@novu/node';
export const novu = new Novu('<REPLACE_WITH_API_KEY_FROM_ADMIN_PANEL>');

await novu.subscribers.remove(user.id);
```
