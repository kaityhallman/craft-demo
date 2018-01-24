import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';

function SelectionChoiceInput({ htmlId, children, name, onChange, error, value, action, actionText }) {
  return (
    <TextInput
      htmlId={htmlId}
      children={children}
      name={name}
      onChange={onChange}
      error={error}
      value={value}
      action={action}
      actionText={actionText}
    />
  )
};

SelectionChoiceInput.propTypes = {
  htmlId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'text',
    'number',
  ]),
  value: PropTypes.any,
  error: PropTypes.string,
  children: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  action: PropTypes.func,
};

SelectionChoiceInput.defaultProps = {
  value: '',
  error: 'Please fix the errors.',
  children: '',
  action: null,
  actionText: '',
};

export default SelectionChoiceInput;
