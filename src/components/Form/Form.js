import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';

import './_Form.scss';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  get button() {
    return (
      <div className="padded button-wrapper">
        <Button
          category="success"
          action={this.props.successAction}
        >
          Save changes
        </Button>
        <span style={{ display: 'flex', alignItems: 'center' }}>Or</span>
        <Button
          category="danger"
          action={this.props.dangerAction}
        >
          Cancel
        </Button>
      </div>
    );
  }

  render() {
    return (
      <form
        className="form"
        onSubmit={() => {}}
      >
        <header className="header">
          <h1 className="legend">{this.props.legend}</h1>
        </header>
        {this.props.children}
        {this.button}
      </form>
    );
  }
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  legend: PropTypes.string.isRequired,
}

export default Form;
