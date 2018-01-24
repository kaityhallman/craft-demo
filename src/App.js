import React, { Component } from 'react';

import Form from './components/Form/Form';
import Label from './components/Label/Label';
import MultiSelectInput from './components/MultiSelectInput/MultiSelectInput';
import SelectInput from './components/SelectInput/SelectInput';
import TextInput from './components/TextInput/TextInput';

import options from './constants/options';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: {
        label: '',
        defaultValue: '',
        multiselectOptions: [],
        order: null,
      },
      currentSelectionOption: '',
      errors: {
        label: '',
        defaultValue: '',
        multiselect: '',
      },
    };
  }

  onChange = (event) => {
    const data = this.state.data;
    data[event.target.name] = event.target.value;
    this.setState({ data });
  }

  addSelectionChoice = () => {
    const newOptions = [];
    const data = {...this.state.data};
    const multiSelectOptions = data.multiselectOptions;

    const value = this.state.currentSelectionOption.toLowerCase().replace(/\s+/g, '-');
    const text = this.state.currentSelectionOption;
    const option = {
      value,
      text,
    };

    newOptions.push(option);

    data.multiselectOptions = multiSelectOptions.filter(value => option.value !== value).concat(newOptions);

    this.setState({ currentSelectionOption: '', data });
  }

  onSelectionChoiceChange = (event) => {
    this.setState({ currentSelectionOption: event.target.value });
  }

  render() {
    return (
      <main className="main">
        <Form legend="Field Builder">
          <TextInput
            htmlId="label-field"
            children="Label"
            name="label"
            onChange={this.onChange}
            error={this.state.errors.label}
            value={this.state.data.label}
            required
          />
          <div className="padded">
            <Label htmlFor="type">
              Type
            </Label>
            <span>
              Multi-Select <input type="checkbox" defaultChecked /> A value is required
            </span>
          </div>
          <TextInput
            htmlId="value-field"
            children="Default Value"
            name="defaultValue"
            onChange={this.onChange}
            error={this.state.errors.defaultValue}
            value={this.state.data.defaultValue}
          />
          <MultiSelectInput
            htmlId="choices-field"
            children="Choices"
            name="choices"
            options={this.state.multiSelectOptions}
            error={this.state.errors.multiselect}
            action={this.addSelectionChoice}
            actionText="Add Selection Choice"
            onChange={this.onSelectionChoiceChange}
            value={this.state.currentSelectionOption}
          />
          <SelectInput
            htmlId="order-field"
            children="Order"
            name="order"
            options={options}
          />
        </Form>
      </main>
    );
  }
}

export default App;
