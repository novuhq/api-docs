---
title: Novu Get the webhook provider status of the integration provider
id: get-/v1/integrations/webhook/provider/:providerId/status
type: snippets
---

```javascript label=Node.js
import { Novu } from '@novu/node';  
export const novu = new Novu('<REPLACE_WITH_API_KEY_FROM_ADMIN_PANEL>');
await novu.integrations.getWebhookProviderStatus();
```