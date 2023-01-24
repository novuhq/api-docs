---
title: Novu Delete an integration
id: delete-/v1/integrations/:integrationId
type: snippets
---

```javascript label=Node.js
import { Novu } from '@novu/node';  
export const novu = new Novu('<REPLACE_WITH_API_KEY_FROM_ADMIN_PANEL>');
await novu.integrations.delete('integrationId');
```