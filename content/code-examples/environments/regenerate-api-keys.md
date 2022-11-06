---
title: Novu regenerate api keys
id: post-/v1/environments/api-keys/regenerate
type: snippets
---

```javascript label=Node.js
import { Novu } from '@novu/node';

export const novu = new Novu('<REPLACE_WITH_API_KEY_FROM_ADMIN_PANEL>');

await novu.environments.regenerateApiKeys();
```
