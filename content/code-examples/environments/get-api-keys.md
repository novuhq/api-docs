---
title: Novu get all api keys 
id: get-/v1/environments/api-keys
type: snippets
---

```javascript label=Node.js
import { Novu } from '@novu/node';

export const novu = new Novu('<REPLACE_WITH_API_KEY_FROM_ADMIN_PANEL>');

await novu.environments.getApiKeys();
```
