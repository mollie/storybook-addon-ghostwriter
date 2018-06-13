# storybook-addon-ghostwriter

Looking for a way to interactively document all variants of your React components without having to update your Storybook stories every time a component changes? Ghostwriter allows you to build your UI component library and automatically generate documentation for each story by extracting your component `PropTypes` and `Flow types`. Ghostwriter knows what's possible within all of your components. It will pass the available component `props` to the Storybook Knobs Addon, which allows you to edit React props dynamically using the Storybook UI.

Sometimes simply rendering your component on its own doesn't explain its purpose. Ghostwriter allows you to demonstrate your components both on its own and in context (by wrapping the component in components).

# Installation

Add Ghostwriter as a dev dependency to your project using NPM:

```
npm install --save-dev @mollie/storybook-addon-ghostwriter
```

Or, if you prefer Yarn:

```
yarn add --dev @mollie/storybook-addon-ghostwriter
```

# Setup

Configure Ghostwriter as an addon by adding it to `addons.js` file (located in the Storybook config directory):

```js
import '@mollie/storybook-addon-ghostwriter/register';
```

# Writing stories

Now, write your stories with Ghostwriter.

```js
import React from 'react';
import { storiesOf } from '@storybook/react';

// Load Ghostwriter
import ghostwriter from '@mollie/storybook-addon-ghostwriter';

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
