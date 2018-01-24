import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from '../Button/Button';
import Label from '../Label/Label';

import './_TextInput.scss';

function TextInput({ htmlId, name, type = "text", required = false, onChange, value, error, children, action, actionText, ...props }) {
  const inputClasses = classnames('field', {
    'field error': error,
  });

  return (
    <div className="padded">
      <Label htmlFor={htmlId} children={children} required={required} />
      <input
        id={htmlId}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
        className={inputClasses}
      />
      {error && <div className="error" style={{color: 'red'}}>{error}</div>}
      {action && <Button action={action}>{actionText}</Button>}
    </div>
  );
}

TextInput.propTypes = {
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
  actionText: PropTypes.string,
};

TextInput.defaultProps = {
  value: '',
  error: 'Please fix the errors.',
  children: '',
  action: null,
  actionText: '',
};

export default TextInput;
