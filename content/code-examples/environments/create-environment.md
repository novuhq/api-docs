---
title: Novu create one environment
id: post-/v1/environments/
type: snippets
---

```javascript label=Node.js
import { Novu } from '@novu/node';

export const novu = new Novu('<REPLACE_WITH_API_KEY_FROM_ADMIN_PANEL>');

const payload: IEnvironmentCreatePayload = {
  name: 'test',
  parentId: 'as20dfbjsfi3ssdk39dh'
} 

await novu.environments.create(payload);
```
