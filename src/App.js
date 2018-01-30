import React, { Component } from 'react';

import Form from './components/Form/Form';
import Label from './components/Label/Label';
import MultiSelectInput from './components/MultiSelectInput/MultiSelectInput';
import SelectInput from './components/SelectInput/SelectInput';
import TextInput from './components/TextInput/TextInput';

import options from './constants/options';

import { saveFieldBuilder } from './apis/fieldBuilderApi';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      data: {
        label: '',
        defaultValue: '',
        multiselectOptions: [],
        displayAlpha: false,
        displaySequential: false,
        displayRandom: false,
        required: false,
      },
      currentSelectionOption: '',
      errors: {
        label: '',
        defaultValue: '',
        multiselect: '',
      },
    };
  }

  // on change function for text input fields
  onChange = (event) => {
    const data = {...this.state.data};
    const errors = {...this.state.errors};

    data[event.target.name] = event.target.value;
    errors[event.target.name] = '';

    this.setState({ data, errors });
  }

  // toggle required state
  onCheckboxChange = () => {
    const data = this.state.data;
    data.required = !data.required;
    this.setState({ data });
  }

  // add selection choice to select list
  addSelectionChoice = (selectionOption) => {
    const newOptions = [];
    const data = {...this.state.data};
    const errors = {...this.state.errors};
    const multiSelectOptions = data.multiselectOptions;

    const value = selectionOption.toLowerCase().replace(/\s+/g, '-');
    const text = selectionOption;
    const option = {
      value,
      text,
    };

    if (value.length && text.length) {
      newOptions.push(option);
    }

    const content = {
      data,
      multiSelectOptions,
      option,
      errors,
      newOptions,
    }

    const newContent = this.filterChoices(content);

    if (newContent.data.multiselectOptions.length > 50) {
      errors.multiselect = '50 choices maximum.';
      this.setState({ errors, currentSelectionOption: '' });
    } else {
      this.setState({ errors, currentSelectionOption: '', data: newContent.data });
    }
  }

  // return choice values and filter out duplicates
  filterChoices = (content) => {
    content.data.multiselectOptions = content.multiSelectOptions.filter(input => {
      if (content.option.value !== input.value) {
        return content.option;
      } else {
        content.errors.multiselect = 'Duplicate entry.';
        return false;
      }
    }).concat(content.newOptions);

    return content;
  }

  // on change function for add selection choice input field
  onSelectionChoiceChange = (event) => {
    const errors = {...this.state.errors};
    errors.multiselect = '';
    this.setState({ currentSelectionOption: event.target.value, errors });
  }

  // on change function for select input field
  onSelectChange = (event) => {
    const data = {...this.state.data};
    switch (event.target.value) {
      case 'alphabetical':
        data.displayAlpha = true;
        this.setState({ data });
        break;
      case 'most-recent':
        data.displaySequential = true;
        this.setState({ data });
        break;
      case 'randomize':
        data.displayRandom = true;
        this.setState({ data });
        break;
      default:
        data.displayAlpha = true;
        this.setState({ data });
    }
  }

  // clear out builder and all fields completely
  clearBuilder = () => {
    const data = Object.assign({}, this.state.data, {
      label: '',
      required: false,
      multiselectOptions: [],
      displayAlpha: false,
      displaySequential: false,
      displayRandom: false,
      defaultValue: '',
    });

    this.setState({ data });
  }

  // save field values to endpoint
  saveBuilder = () => {
    const fieldJson = {
		  label: this.state.data.label,
		  required: this.state.data.required,
		  choices: this.state.data.multiselectOptions,
		  displayAlpha: this.state.data.displayAlpha === true || false, // use displayAlpha by default if input is untouched
      displaySequential: this.state.data.displaySequential,
      displayRandom: this.state.data.displayRandom,
		  default: this.state.data.defaultValue,
		};

    const formIsValid = this.checkIfValid(fieldJson);

    if (formIsValid) {
      saveFieldBuilder(fieldJson)
        .then((response) => {
          console.log('Field JSON:', fieldJson);
          console.log('API Response: ', response);
        })
        .catch((error) => {
          console.log('error', error);
        });
    }
  }

  // validate form values
  checkIfValid = (json) => {
    const errors = {...this.state.errors};
    let formIsValid = false;

    // make sure to add default value to list if it has not been added to choices list already
    if (json.choices.filter(option => json.default !== option.text)) {
      this.addSelectionChoice(json.default);
      formIsValid = true;
    }

    // label must have length greater than 1
    if (json.label.length < 1) {
      errors.label = 'Label is required.';
      formIsValid = false;
    }

    // must add choices to list
    if (json.choices.length < 1) {
      errors.multiselect = 'Choices required';
      formIsValid = false;
    }

    this.setState({ errors });

    return formIsValid;
  }

  render() {
    return (
      <main className="main">
        <Form
          successAction={this.saveBuilder}
          dangerAction={this.clearBuilder}
          legend="Field Builder"
        >
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
              Multi-Select <input type="checkbox" onChange={this.onCheckboxChange} checked={this.state.data.required} /> A value is required
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
            selectionChoiceChildren="Add Choices"
            name="choices"
            options={this.state.data.multiselectOptions}
            error={this.state.errors.multiselect}
            action={() => this.addSelectionChoice(this.state.currentSelectionOption)}
            actionText="Add Selection Choice"
            onChange={this.onSelectionChoiceChange}
            value={this.state.currentSelectionOption}
          />
          <SelectInput
            htmlId="order-field"
            children="Order"
            name="order"
            options={options}
            onChange={this.onSelectChange}
          />
        </Form>
      </main>
    );
  }
}

export default App;
