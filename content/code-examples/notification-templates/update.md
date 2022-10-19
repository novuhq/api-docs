---
title: Novu update notification template
type: snippets
---

```javascript label=Node.js
import { Novu } from '@novu/node';

export const novu = new Novu('<REPLACE_WITH_API_KEY_FROM_ADMIN_PANEL>');

await novu.notificationTemplates.update("templateId", {
    name: "name",
    tags: ["tags"],
    description: "description",
    identifier: "identifier",
    steps: ["steps"],
    notificationGroupId: "notificationGroupId",
    active: true,
    critical: true,
    preferenceSettings: preferenceSettings
})
```
