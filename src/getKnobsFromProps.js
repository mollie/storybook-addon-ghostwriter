import React from 'react';
import { isNotEmpty } from './util';
import { number, boolean, select, text, object } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

const blackList = ['intl'];

//
const singleQuoteStripper = string => string.replace(/'/g, '');

const getKnob = ({ propType, property, defaultValue }, isRequired) => {
  // If property is blacklisted, simply return a string instead of full object
  if (blackList.includes(property)) {
    return `shape-of-${property}`;
  }

  // This will switch through all flow types/PropTypes that are given by reactdocgen
  switch (propType.name) {
    // A node will return a <span /> with text knob
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

    // A string will return a text knob
    case 'string': {
      const defaultText = defaultValue && singleQuoteStripper(defaultValue);

      if (isRequired) {
        return text(property, defaultText || 'defaultText');
      }

      return text(property, defaultText || '');
    }

    // A number will return a number knob
    case 'number': {
      const numberKnob = number(property, defaultValue || 0);

      if (isRequired) {
        return numberKnob || 0;
      }

      return numberKnob > 0 ? numberKnob : undefined;
    }

    // A boolean will return a boolean knob
    case 'bool':
    case 'boolean': {
      const value = defaultValue === 'true';

      return boolean(property, value);
    }

    // Whenever there is a function we can we return an action()
    case 'func':
    case 'Function':
      return action(property);

    // Unions are present in both Flow types and PropTypes. Will return a select
    case 'union': {
      // If propType.value exosts then a PropType is used instead of a Flow type
      if (propType.value) {
        // Prototype unions will never be all literal
        return getKnob({ propType: propType.value[0], property, defaultValue }, isRequired);
      }

      // Check if PropType contains all strings. Otherwise, get the first one
      const allLiteral = propType.elements && propType.elements.every(x => x.name === 'literal');

      if (allLiteral) {
        let value = defaultValue && singleQuoteStripper(defaultValue);

        if (!value && property.required) {
          value = singleQuoteStripper(propType.elements[0]);
        }

        if (!defaultValue && !property.required) {
          propType.elements.push('');
          value = '';
        }

        return select(property, propType.elements.map(x => singleQuoteStripper(x.value)), value);
      }

      // When it's not all literal or strings, return a new know (the first of the array)
      return getKnob({ propType: propType.elements[0], property, defaultValue }, isRequired);
    }

    // Enums will return a select with all the values given by the PropTypes
    case 'enum': {
      let value = defaultValue && singleQuoteStripper(defaultValue);
      const propTypeValues = [...propType.value];

      if (!value && property.required) {
        value = singleQuoteStripper(propTypeValues[0]);
      }

      if (!defaultValue && !property.required) {
        propTypeValues.push({ value: '' });
        value = '';
      }

      return select(property, propTypeValues.map(x => singleQuoteStripper(x.value)), value);
    }

    /**
     * Arrays will return an object with the shape it desires to have
     *
     * @todo: recognize boolean and add that as value instead of value: 'bool'
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
     * When we can't figure out what to do we pass this as a warning to the console
     *
     * @todo: We should either remove this or put it behind a debug flag
     */
    default:
      /* eslint-disable-next-line */
      console.warn('could not handle prop: ', property, ' with properties:', propType);
      return;
  }
};

const isRequired = prop => prop.propType.required || prop.required || false;

const getKnobsFromProps = propsFromDocgen => {
  if (isNotEmpty(propsFromDocgen)) {
    return {};
  }

  // Reduce all props from component.__docgen -> register a knob and get a value -> return value.
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

export default getKnobsFromProps;
