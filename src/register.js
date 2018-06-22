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

const codeSnippet = `import React from 'react';
import { storiesOf } from '@storybook/react';

// Story components
import ghostwriter from 'storybook-addon-ghostwriter';

// This is an example component.
import PropTypes from 'prop-types';

export default class ExampleComponent extends React.Component {
  render() {
    const { className, propName, children } = this.props;
    return (
      <div className={className}>
        <strong>{propName}</strong> {children}
      </div>
    );
  }
}

ExampleComponent.propTypes = {
  className: PropTypes.string,
  propName: PropTypes.string.isRequired,
  children: PropTypes.element,
};

// Overwrite of default props This could be a knob form the knob addon
const getDefaultProps = () => ({ className: 'overwrite' });
const markdown = \`# Markdown example\`;

storiesOf('components', module)
  .addDecorator(
    ghostwriter({
      // Notice that we dont use angle brackets; '<' and '>'
      component: ExampleComponent,
      // This overwrites the knobs by docs
      componentProps: getDefaultProps,
      // Extra info
      markdown: markdown,
      // Sometimes you need some additionalContext (for example: a button to open a dialog by ref)
      additionalContext: <span>i'll render normal JSX</span>,
    }),
  )
  .add('ExampleComponent', () => {
    return (
      <div>
        <p>Put your component in context. Like:</p>
        <p>this is a component in the wild!</p>
        <div
          style={{
            border: '2px solid #000',
            padding: '40px',
            borderRadius: '4px',
            textAlign: 'center',
          }}>
          <ExampleComponent className="some-class-name" propName="make some context">
            Wow context
          </ExampleComponent>
        </div>
      </div>
    );
  });
`;

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
      </div>
    ),
  });
});
