import React from 'react';
import addons from '@storybook/addons';

import '@storybook/addon-actions/register';
import '@storybook/addon-knobs/register';

// components
const MollieLogo = require('./mollie-logo.svg');

const codeSnippet = `
import React from 'react';
import { storiesOf } from '@storybook/react';

// story components
import ghostwriter from '@mollie/storybook-addon-ghostwriter';

// Component
import YOUR_COMPONENT from './index';

// Overwrite of default props This could be a knob form the knob addon
const getDefaultProps = () => ({prop:'overwrite'});
const markdown = \`# Markdown example\`;

storiesOf('UI', module)
  .addDecorator(
    ghostwriter({
      // don't use the '< >' just the component
      component: YOUR_COMPONENT,
      // This overwrites the knobs by docs
      componentProps: getDefaultProps,
      // extra info
      markdown: markdown,
      // sometime you need some additionalContext (like a button to open a dialog)
      additionalContext: <div>Hi there i'll render normal JSX</div>
}),
  )
  .add('YOUR_COMPONENT', () => {
    return (
      <div>
        <p>Put your component in context. Like:</p> 
        <p>this is a component in the wild!</p>
        <div style={{backgroundColor:'#232c56'}}>
          <YOUR_COMPONENT>
        </div>
      </div>
    );
});`;

addons.register('mollie/ghostwriter', () => {
  addons.addPanel('mollie/ghostwriter/panel', {
    title: 'Mollie Ghostwriter',
    render: () => (
      <div style={{ width: '100%', padding: '2%' }}>
        <div style={{ maxWidth: '200px' }}>
          <MollieLogo />
        </div>
        <p>Mollie Ghostwriter is an opinionated way of writing your stories.</p>
        <h3>Code Snippet</h3>
        <pre style={{ whiteSpace: 'pre-wrap' }}>
          <code>{codeSnippet}</code>
        </pre>
      </div>
    ),
  });
});
