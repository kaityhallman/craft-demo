import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './_Button.scss';

function Button({ action, children, type = "button", category }) {
  const buttonClass = classnames('button', {
    success: category === 'success',
    danger: category === 'danger',
  });

  return (
    <button
      className={buttonClass}
      type={type}
      onClick={action}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  action: PropTypes.func,
  children: PropTypes.string.isRequired,
  category: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  category: 'success',
  action: () => {},
};

export default Button;
