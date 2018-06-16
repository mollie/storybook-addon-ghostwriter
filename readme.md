<h1 align="center">storybook-addon-ghostwriter</h1>

## Introduction

Looking for a way to interactively document all variants of your React components without having to update your Storybook stories every time a component changes? Ghostwriter allows you to build your UI component library and automatically generate documentation for each story by extracting your `PropTypes` and `Flow types`. It will pass the available component `props` to the Storybook Knobs Addon, which allows you to edit React props dynamically using the Storybook UI.

Sometimes simply rendering your component on its own doesn't explain its purpose. Ghostwriter allows you to demonstrate your components both on its own and in context (by wrapping the component in components).

## Installation

Add Ghostwriter as a `devDependency` to your project using NPM:

```
npm install --save-dev storybook-addon-ghostwriter
```

Or, if you prefer Yarn:

```
yarn add --dev storybook-addon-ghostwriter
```

## Writing stories

Configure Ghostwriter as an addon by adding it to `addons.js` file (located in the Storybook config directory):

```js
import 'storybook-addon-ghostwriter/register';
```

## Writing stories

Now, write your stories with Ghostwriter.

```js
import React from 'react';
import { storiesOf } from '@storybook/react';

// Load Ghostwriter
import ghostwriter from 'storybook-addon-ghostwriter';

// Component
import ListItem from './index';
import ListItemWrapper from 'components/ListItemWrapper';
import DownloadIcon from 'images/icons/download.svg';
import UploadIcon from 'images/icons/upload.svg';

const getDefaultProps = () => ({
  icon: <DownloadIcon />,
  iconSize: 'regular',
});
const markdown = `Accessible modal dialog component for React.`;

storiesOf('UI', module)
  .addDecorator(
    ghostwriter({
      component: ListItem,
      componentProps: getDefaultProps,
      markdown: markdown,
      additionalContext: <div>Additional content</div>,
    }),
  )
  .add('ListItem', () => {
    return (
      <ListItemWrapper>
        <ListItem icon={<UploadIcon />} iconSize="large" />
        <ListItem icon={<UploadIcon />} iconSize="large" />
      </ListItemWrapper>
    );
  });
```

## Contributing

Want to help us make our API client even better? We take [pull requests](https://github.com/mollie/storybook-addon-ghostwriter/pulls).

## Working at Mollie

Mollie is always looking for new talent to join our teams. We’re looking for inquisitive minds with good ideas and strong opinions, and, most importantly, who know how to ship great products. Want to join the future of payments? [Check out our vacancies](https://jobs.mollie.com).

## License

[New BSD (Berkeley Software Distribution) License](https://opensource.org/licenses/BSD-3-Clause). Copyright 2013-2017, Mollie B.V.