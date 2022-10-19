---
title: Novu create notification template
type: snippets
---

```javascript label=Node.js
import { Novu } from '@novu/node';

export const novu = new Novu('<REPLACE_WITH_API_KEY_FROM_ADMIN_PANEL>');

await novu.notificationTemplates.create({
    name: "name",
    notificationGroupId: "notificationGroupId",
    tags: ["tags"],
    description: "description",
    steps: ["steps"],
    active: true,
    draft: true,
    critical: true,
    preferenceSettings: preferenceSettings
});
```
