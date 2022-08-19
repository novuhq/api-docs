---
title: Novu get subscriber preferences
id: get-/v1/subscribers/:subscriberId/preferences
type: snippets
---

```javascript label=Node.js
import { Novu } from '@novu/node';
export const novu = new Novu('<REPLACE_WITH_API_KEY_FROM_ADMIN_PANEL>');

await novu.subscribers.getPreference(user.id);
```
