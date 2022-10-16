---
title: Novu apply one change
id: post-/v1/changes/:changeId/apply
type: snippets
---

```javascript label=Node.js
import { Novu } from '@novu/node';

export const novu = new Novu('<REPLACE_WITH_API_KEY_FROM_ADMIN_PANEL>');

await novu.changes.applyOne(changeId);
```
