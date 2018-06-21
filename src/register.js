import React from 'react';
import addons from '@storybook/addons';

/**
 * Register all the add-ons Ghostwriter needs
 * Order matters first will be the first panel and therefore active.
 */
import '@storybook/addon-knobs/register';
import '@storybook/addon-actions/register';

const SYSTEM_FONT_STACK =
  '-apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", "Lucida Grande", Arial, sans-serif';

const MollieLogoSVG = require('./mollie-logo.svg');

const PoweredByMollie = () => (
  <div
    style={{
      textAlign: 'center',
      fontFamily: SYSTEM_FONT_STACK,
      marginTop: '35px',
      borderTop: '1px solid #ededed',
    }}>
    <div
      style={{
        fontSize: '9px',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        marginTop: '35px',
      }}>
      Powered by
    </div>
    <img
      src={MollieLogoSVG}
      alt="Mollie"
      style={{
        width: 'auto',
        height: '20px',
      }}
    />
  </div>
);

const codeSnippet = `
import React from 'react';
import { storiesOf } from '@storybook/react';

// story components
import ghostwriter from 'storybook-addon-ghostwriter';

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
        <div style={{backgroundColor:'#000',padding:'40px',borderRadius:'4px',textAlign:'center'}}>
          <YOUR_COMPONENT />
        </div>
      </div>
    );
});`;

addons.register('mollie/ghostwriter', () => {
  addons.addPanel('mollie/ghostwriter/panel', {
    title: 'Ghostwriter',
    render: () => (
      <div
        style={{
          width: '100%',
          padding: '2%',
          fontFamily: SYSTEM_FONT_STACK,
        }}>
        <p
          style={{
            fontFamily: 'Arial',
            fontSize: '14px',
          }}>
          Ghostwriter is an opinionated way of writing your stories.
        </p>
        <h3
          style={{
            color: 'rgb(190, 190, 190)',
            textTransform: 'uppercase',
            fontSize: '16px',
            fontWeight: 500,
          }}>
          Code Snippet
        </h3>
        <pre
          style={{
            fontFamily: 'SFMono, Consolas, Liberation Mono, Menlo, Courier, monospace',
            whiteSpace: 'pre-wrap',
            border: '1px solid #e6e6e6',
            borderRadius: '4px',
            marginBottom: '40px',
            display: 'block',
            padding: '30px',
            overflow: 'scroll',
            color: '#595959',
            background: '#fcfcfc',
          }}>
          <code>{codeSnippet}</code>
        </pre>
        <PoweredByMollie />
      </div>
    ),
  });
});
