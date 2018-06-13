import * as React from 'react';

const blah = 'test';

// Components
import TabInfo from './TabInfo';
import classNames from 'classnames';
import { withKnobs } from '@storybook/addon-knobs';

const getClass = isActive =>
  classNames('c-ghostwriter--tab', {
    'is-active': isActive,
  });

class Ghostwriter extends React.Component {
  state = {
    currentTab: 'info',
  };

  getContent = () => {
    const { currentTab } = this.state;
    const { component, children, componentProps, ...rest } = this.props;

    if (currentTab === 'info') {
      return <TabInfo {...rest} componentProps={componentProps} component={component} />;
    }

    // This is the actual content of a story (.add())
    return children;
  };

  changeTab = tabName => () => {
    this.setState({ currentTab: tabName });
  };

  render() {
    const { currentTab } = this.state;
    const content = this.getContent();
    require('./styles.css');
    return (
      <div className="c-ghostwriter">
        <div className="c-ghostwriter--tab-group">
          <button
            type="button"
            className={getClass(currentTab === 'info')}
            onClick={this.changeTab('info')}>
            Info
          </button>
          <button
            type="button"
            className={getClass(currentTab === 'context')}
            onClick={this.changeTab('context')}>
            context
          </button>
        </div>
        <div className="c-ghostwriter--content">{content}</div>
      </div>
    );
  }
}

export default props => storyFn =>
  withKnobs(() => <Ghostwriter {...props}>{storyFn()}</Ghostwriter>);
