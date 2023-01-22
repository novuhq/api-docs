---
title: Novu Get all active integrations
id: get-/v1/integrations/active
type: snippets
---

```javascript label=Node.js
import { Novu } from '@novu/node';  
export const novu = new Novu('<REPLACE_WITH_API_KEY_FROM_ADMIN_PANEL>');
await novu.integrations.getActive();
```