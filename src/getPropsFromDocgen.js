const getPropsFromDocgen = docgenInfo => {
  const props = {};

  if (!docgenInfo) {
    return;
  }

  const docgenInfoProps = docgenInfo.props;

  Object.keys(docgenInfoProps).forEach(property => {
    const docgenInfoProp = docgenInfoProps[property];
    const defaultValueDesc = docgenInfoProp.defaultValue || {};
    const propType = docgenInfoProp.flowType || docgenInfoProp.type || 'other';

    props[property] = {
      property,
      propType,
      required: docgenInfoProp.required,
      description: docgenInfoProp.description,
      defaultValue: defaultValueDesc.value,
    };
  });

  return props;
};

export default getPropsFromDocgen;
