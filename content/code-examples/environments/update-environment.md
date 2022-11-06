---
title: Novu update one environment
id: put-/v1/environments/:environmentId
type: snippets
---

```javascript label=Node.js
import { Novu } from '@novu/node';

export const novu = new Novu('<REPLACE_WITH_API_KEY_FROM_ADMIN_PANEL>');

const payload: IEnvironmentUpdatePayload = {
  name: 'new environment';
  identifier: 'test env';
  parentId: '109ufdsnfkhk890hhjsdf';
}

const envId = '12390dsfkhjk9dfd'

await novu.environments.updateOne(envId, payload);
```
