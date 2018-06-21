<h1 align="center">Storybook Addon Ghostwriter</h1>

<img src=".github/art/screenshot.jpg" />

## Motivation

Storybook Addon Ghostwriter allows you to write your Storybook stories faster. Your codebase changes continuously and you don't want to update your Storybook stories every time your components change. Ghostwriter extracts your components’ `PropTypes` / `Flow types` and allows you to edit React props dynamically using the Storybook UI. Your components get documented automatically by providing a static overview of the available props. Ghostwriter generates code snippets for both your component and your Storybook stories, allowing you to ship new components faster.

### Advantages

- Write Storybook stories faster
- Less maintenance
- Dynamic component prop generation
- Works with High Order Components
- Component documentation

## Installation

Please make sure you have the following peer dependencies installed:

- `babel-plugin-react-docgen`
- `@storybook/addon-actions`
- `@storybook/addon-info`
- `@storybook/addon-knobs`
- `@storybook/addons`
- `lodash`
- `react`

Add Ghostwriter and its peer dependencies as a `devDependency` to your project using NPM:

```bash
npm install --save-dev storybook-addon-ghostwriter
# Install peer dependencies
npm install --save-dev babel-plugin-react-docgen @storybook/addon-actions @storybook/addon-info @storybook/addon-info @storybook/addons lodash @storybook/addon-knobs
```

Or, if you prefer Yarn:

```bash
yarn add --dev storybook-addon-ghostwriter
# Install peer dependencies
yarn add --dev babel-plugin-react-docgen @storybook/addon-actions @storybook/addon-info @storybook/addon-info @storybook/addons lodash @storybook/addon-knobs
```

Add the following line to your `.babelrc` file:

```json
{
  "plugins": [
    [
      "react-docgen",
      {
        "resolver": "findAllComponentDefinitions"
      }
    ]
  ]
}
```

Configure Ghostwriter as an addon by adding it to `addons.js` file (located in the Storybook config directory):

```js
// .storybook/addons.js
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

Want to help us make Storybook Addon Ghostwriter better? We take [pull requests](https://github.com/mollie/storybook-addon-ghostwriter/pulls).

## Working at Mollie

Mollie is always looking for new talent to join our teams. We’re looking for inquisitive minds with good ideas and strong opinions, and, most importantly, who know how to ship great products. Want to join the future of payments? [Check out our vacancies](https://jobs.mollie.com).

## License

[New BSD (Berkeley Software Distribution) License](https://opensource.org/licenses/BSD-3-Clause). Copyright 2013-2018, Mollie B.V.