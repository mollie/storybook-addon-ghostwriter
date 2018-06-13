export const isNotEmpty = obj => obj && obj.props && Object.keys(obj.props).length > 0;

export const hasDocgen = component =>
  (component.__docgenInfo && isNotEmpty(component.__docgenInfo)) ||
  (component.WrappedComponent && hasDocgen(component.WrappedComponent));

export const isIntlInjected = component => component.name && component.name === 'InjectIntl';

export const getComponentName = component => {
  if (isIntlInjected(component)) {
    return component.WrappedComponent.displayName || component.WrappedComponent.name;
  }

  return component.displayName || component.name;
};

export const getDocgenInfo = component =>
  isIntlInjected(component) ? component.WrappedComponent.__docgenInfo : component.__docgenInfo;
