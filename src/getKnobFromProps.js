import React from 'react';
import { isNotEmpty } from './util';
import { number, boolean, select, text, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

const blackList = ['intl'];

const getKnob = ({ propType, property, defaultValue }, isRequired) => {
  // Some of the properties will output there comple object sometimes it's nice to just return a string
  if (blackList.includes(property)) {
    return `shape-of-${property}`;
  }

  // this will switch through out all flow/proptypes that a given by reactdocgen
  switch (propType.name) {
    /**
     * If it requires a node it will make a <span/> with text knob
     */
    case 'Node':
    case 'node':
    case 'ReactElement':
    case 'ReactNode': {
      let showChild = true;

      if (!isRequired) {
        showChild = boolean(`Enable child: ${property}`, true);
      }
      return showChild && <span>{text(property, `prop text: ${property}`)}</span>;
    }

    /**
     * a string will return a text knob
     */
    case 'string': {
      const defaultText = defaultValue && defaultValue.replace(/'/g, '');

      if (isRequired) {
        return text(property, defaultText || 'defaultText');
      }

      return text(property, defaultText || '');
    }

    /**
     * a number will return a number knob
     */
    case 'number': {
      const numberKnob = number(property, defaultValue || 0);

      if (isRequired) {
        return numberKnob || 0;
      }

      return numberKnob > 0 ? numberKnob : undefined;
    }

    /**
     * a bool will return a boolean knob
     */
    case 'bool':
    case 'boolean': {
      const value = defaultValue === 'true';

      return boolean(property, value);
    }

    /**
     * Whenever there is a function we can we return an action()
     */
    case 'func':
    case 'Function':
      return action(property);

    /**
     * Union a bit of a hassle becuase it exist in Flow as in PropType and that a bit different
     */
    case 'union': {
      // if propType.value then it's a proptype instead of flowtyped
      if (propType.value) {
        // prototype union will never be all literal
        return getKnob({ propType: propType.value[0], property, defaultValue }, isRequired);
      }

      // check if its all strings else get first.
      const allLiteral = propType.elements && propType.elements.every(x => x.name === 'literal');

      if (allLiteral) {
        let value = defaultValue && defaultValue.replace(/'/g, '');

        if (!value && property.required) {
          value = propType.elements[0].replace(/'/g, '');
        }

        if (!defaultValue && !property.required) {
          propType.elements.push('');
          value = '';
        }

        return select(property, propType.elements.map(x => x.value.replace(/'/g, '')), value);
      }

      // when it's not all literal or string return a new know (the first of the array this is opinionated)
      return getKnob({ propType: propType.elements[0], property, defaultValue }, isRequired);
    }

    /**
     * Enums will return a select with all the values given by the proptypes
     */
    case 'enum': {
      let value = defaultValue && defaultValue.replace(/'/g, '');
      const propTypeValues = [...propType.value];

      if (!value && property.required) {
        value = propTypeValues[0].replace(/'/g, '');
      }

      if (!defaultValue && !property.required) {
        propTypeValues.push({ value: '' });
        value = '';
      }

      return select(property, propTypeValues.map(x => x.value.replace(/'/g, '')), value);
    }

    /**
     * Array will return an object with the shape it desires to have
     * Todo: recognize boolean and add that as value instead of value: 'bool'
     */
    case 'arrayOf': {
      const values = propType.value.value;

      const exampleObject = Object.keys(values).reduce((acc, key) => {
        acc[key] = values[key].name;
        return acc;
      }, {});

      return object(property, [exampleObject]);
    }

    /**
     * When we can't figure out what to we pass this as a warning to the console
     * This is manly for dev
     * todo: remove this or put it behind a flag
     */
    default:
      /* eslint-disable-next-line */
      console.warn('could not handle prop: ', property, ' with properties:', propType);
      return;
  }
};

const isRequired = prop => prop.propType.required || prop.required || false;

const geKnobProps = propsFromDocgen => {
  if (isNotEmpty(propsFromDocgen)) {
    return {};
  }

  /**
   * reduce all props from component.__docgen -> register a knob and get a value -> return value.
   */
  const knobProps = Object.keys(propsFromDocgen).reduce((acc, currKey) => {
    const currentProp = propsFromDocgen[currKey];

    if (!currentProp.propType && !currentProp.propType.name) {
      return acc;
    }

    acc[currKey] = getKnob(currentProp, isRequired(currentProp));

    return acc;
  }, {});

  return knobProps;
};

export default geKnobProps;
