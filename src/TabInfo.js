import * as React from 'react';
import { withInfo } from '@storybook/addon-info';
import getPropsFromDocgen from './getPropsFromDocgen';
import getKnobsFromProps from './getKnobFromProps';
import { omit, isFunction } from 'lodash';
import { hasDocgen, getDocgenInfo, getComponentName } from './util';

const enhance = ({ component, props }) => {
  class EnhancedComp extends React.Component {
    render() {
      // clone the prop::component and add the new props
      return React.createElement(component, props);
    }
  }

  EnhancedComp.__docgenInfo = getDocgenInfo(component);
  EnhancedComp.displayName = getComponentName(component);
  // Strip the ref property if there is one. it should be on the component not the wrapper
  const { ref, ...enhancedCompProps } = props;
  return React.createElement(EnhancedComp, { ...enhancedCompProps });
};

const getComponentProps = componentProps => {
  if (isFunction(componentProps)) {
    return componentProps();
  }
  return componentProps || {};
};

export class tabInfo extends React.Component {
  /**
   * getEnhancedComponent function will make the component so that
   * withinfo and withintl can deal with the components
   */
  getEnhancedComponent = () => {
    const { component, componentProps } = this.props;
    const componentPropsObject = getComponentProps(componentProps);

    if (!hasDocgen(component)) {
      /* eslint-disable-next-line */
      console.dir(component);
      console.error(
        "There is no docgen info found on the component;\nmost likely this is because the babel loader isn't initiated properly.\nCheck if the babel loader plugins contains: 'react-docgen'",
      );
      return;
    }

    // get the props generated by babel-plugin-react-docgen
    const docgenInfo = getDocgenInfo(component);

    // get a nice formatted list of the docgen
    const propDefinitionsMap = getPropsFromDocgen(docgenInfo);

    // make knobs of props (and merge the props that will overwrite)
    const propsWithKnobs = {
      ...getKnobsFromProps(omit(propDefinitionsMap, Object.keys(componentPropsObject))),
      ...componentPropsObject,
    };

    /**
     * Enhance the component. This does is nothing more then adding a wrapper with the right name and docInfo.
     * We have to enchance otherwise displayname and docs won't show the WithInfo addon.
     */
    const EnhancedComponent = enhance({ component, props: propsWithKnobs });

    return EnhancedComponent;
  };

  render() {
    const { context, additionalContext, markdown } = this.props;
    const enhancedComponent = this.getEnhancedComponent();

    // add the info wrapper
    const withInfoComp = withInfo(markdown)(() => enhancedComponent)(context);

    return (
      <div className="c-ghostwriter--tab-info">
        {additionalContext && (
          <div className="c-ghostwriter--tab-info-additional-context">{additionalContext}</div>
        )}
        {withInfoComp}
      </div>
    );
  }
}

export default tabInfo;
