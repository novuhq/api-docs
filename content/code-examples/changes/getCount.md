---
title: Novu get the count of all changes
id: get-/v1/changes/count
type: snippets
---

```javascript label=Node.js
import { Novu } from '@novu/node';

export const novu = new Novu('<REPLACE_WITH_API_KEY_FROM_ADMIN_PANEL>');

await novu.changes.getCount();
```
