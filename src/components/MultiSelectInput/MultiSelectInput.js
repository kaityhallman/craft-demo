import React from 'react'
import PropTypes from 'prop-types';
import Label from '../Label/Label';
import SelectionChoiceInput from '../SelectionChoiceInput';

import './_MultiSelectInput.scss';

function MultiSelectInput({ name, htmlId, options, required, children, selectionChoiceChildren, action, onChange, error, value, actionText }) {
  return (
    <div>
      {options.length < 1 && <SelectionChoiceInput
        htmlId={htmlId}
        children={children}
        name={name}
        onChange={onChange}
        error={error}
        value={value}
        actionText={actionText}
        action={action}
      />}
      {options.length > 0 && <span>
        <Label htmlFor={htmlId} children={children} required={required} />
        <select
          name={name}
          id={htmlId}
          multiple
          className="field multiselect"
          size={options.length}
        >
          {options.map(option => {
            return <option key={option.id} value={option.value}>{option.text}</option>;
          })}
        </select>
      </span>}
    </div>
  );
}

MultiSelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.string,
  required: PropTypes.bool,
  htmlId: PropTypes.string.isRequired,
  options: PropTypes.array,
  actionText: PropTypes.string,
};

MultiSelectInput.defaultProps = {
  children: '',
  required: false,
  options: [],
  actionText: '',
};

export default MultiSelectInput;
