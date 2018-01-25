import React from 'react';
import PropTypes from 'prop-types';
import Label from '../Label/Label';

import './_SelectInput.scss';

function SelectInput({ name, children, required, htmlId, options, onChange }) {
  return (
    <div className="padded">
      <Label htmlFor={name} children={children} required={required} />
      <select
        className="field select"
        name={name}
        id={htmlId}
        onChange={onChange}
      >
        {options.map(option => {
          return <option key={option.id} value={option.value}>{option.text}</option>;
        })}
      </select>
      <div className="arrow-wrapper">
        <span className="arrow" />
      </div>
    </div>
  );
}

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.string,
  required: PropTypes.bool,
  htmlId: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

SelectInput.defaultProps = {
  children: '',
  required: false,
};

export default SelectInput;
