```js script
import { html } from '@open-wc/demoing-storybook';
import '../app-tracker-robbie.js';

export default {
  title: 'AppTrackerRobbie',
  component: 'app-tracker-robbie',
  options: { selectedPanel: "storybookjs/knobs/panel" },
};
```

# AppTrackerRobbie

A component for...

## Features:

- a
- b
- ...

## How to use

### Installation

```bash
yarn add app-tracker-robbie
```

```js
import 'app-tracker-robbie/app-tracker-robbie.js';
```

```js preview-story
export const Simple = () => html`
  <app-tracker-robbie></app-tracker-robbie>
`;
```

## Variations

###### Custom Title

```js preview-story
export const CustomTitle = () => html`
  <app-tracker-robbie title="Hello World"></app-tracker-robbie>
`;
```
