import React from 'react';
import PropTypes from 'prop-types';

import './_Label.scss';

function Label({ htmlFor, children, required }) {
  return (
    <label
      htmlFor={htmlFor}
      className="label"
    >
      {children}{ required && <span style={{ color: 'red' }}> *</span>}
    </label>
  );
}

Label.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

Label.defaultProps = {
  required: false,
};

export default Label;
