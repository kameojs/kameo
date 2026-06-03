<p align="center">
  <a href="#" target="_blank">
    <img src="./assets/logo.svg?sanitize=true" width="180" height="180" alt="Kameo" />
  </a>
</p>

# Kameo

Kameo is a toolkit for creating and rendering interactive web forms in rich text. Based on [ProseMirror](https://prosemirror.net/).

## Screenshot

<p align="center">
  <img src="./assets/screenshot.webp" width="600px" alt="Kameo screenshot" />
</p>

## Features
- **Create and render web forms** - Build interactive forms in rich text
- **Import/export forms** - Save and load forms as JSON
- **Dynamic form creation** - Build forms programmatically with commands
- **Rich text editing capabilities** - Can be used as a rich text editor
- **Extensible and customizable** - Create your own custom extensions and form fields
- **Framework agnostic** - Works seamlessly across different frontend frameworks

## Installation

```bash
npm install @kameo/core @kameo/pm @kameo/starter-kit @kameo/form-kit @kameo/extension-slash-command @kameo/extensions
npm install @awesome.me/webawesome
```

**IMPORTANT**: Kameo is currently in active development and should not be used in production. During this early phase, npm packages will not follow semantic versioning. For now, we recommend experimenting with Kameo in development environments only. You can clone the repository and use the development setup to try out the latest features.

To get started with development env, follow these steps:

```bash
git clone git@github.com:kameojs/kameo.git
cd kameo
npm install && npm run build
cd dev-playground
npm install && npm run start
```

## Quick start

```javascript
import '@awesome.me/webawesome/dist/styles/themes/default.css';
import '@kameo/core/style/theme.css';
import '@kameo/core/webawesome.js';

import { Kameo } from '@kameo/core';
import { StarterKit } from '@kameo/starter-kit';
import { FormKit } from '@kameo/form-kit';
import { SlashCommand, suggestion } from '@kameo/extension-slash-command';
import { Placeholder } from '@kameo/extensions';

const kameo = new Kameo({
  element: document.querySelector('#kameo'),
  extensions: [
    StarterKit,
    FormKit,
    SlashCommand.configure({ suggestion }),
    Placeholder.configure({ placeholder: 'Press / for commands...' }),
  ],
  documentMode: 'edit',
});

kameo.on('submit', (event) => {
  console.log(`on 'submit' event`, { event, formData: event.formData });

  event.setResult({
    success: true,
    message: 'Form is submitted',
  });
});

kameo.on('submit:result', (event) => {
  console.log(`on 'submit:result' event`, { event });
});
```

## Documentation

For full documentation, refer to the project materials in this repository.

Kameo is built on top of Tiptap (core package). To better understand how to work with Kameo, we recommend familiarizing yourself with the Tiptap API documentation:
- [Tiptap Editor API](https://tiptap.dev/docs/editor/api/editor)
- [Core concepts](https://tiptap.dev/docs/editor/core-concepts/introduction)
- [Custom extensions](https://tiptap.dev/docs/editor/extensions/custom-extensions)

## License

The MIT License (MIT). Please see [License](LICENSE) for more information.
