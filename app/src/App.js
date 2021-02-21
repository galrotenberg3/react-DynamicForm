import logo from './logo.svg';
import './App.css';

import React from 'react';

import DynamicForm from './components/dynamic_form/dynamic_form';

function no_operation() {
  return;
}

var is_1 = true;

class ChangeForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {is_1: true};
  }

  on_click_handler = (event) => {
    this.setState((prev_state) => {
      return {is_1: !prev_state.is_1};
    })
  }

  render() {
    let my_form_1 = {
      fields: [
        {
          name: "field-1",
          description: "field-1 description",
          type: "text",
          allowed_values: ["hello", "roger"],
          regex: "*stam*"
        },
        {
          name: "field-2",
          description: "field-2 description",
          type: "picker",
          options: ["value-1", "value-2", "value-3", "value-4"],
          multi_choice: false
        },
        {
          name: "field-3",
          description: "field-3 description",
          type: "number",
          range: false,
          max_value: 20,
          min_value: -5.5
        },
        {
          name: "field-4",
          description: "field-3 description",
          type: "number",
          range: true,
          max_value: 20,
          min_value: -5.5
        },
        {
          name: "field-5",
          description: "field-2 description",
          type: "picker",
          default: null,
          mandatory: false,
          options: ["value-1", "value-2", "value-3", "value-4"],
          multi_choice: true
        },
      ]
    };

    let my_form_2 = {
      fields: [
        {
          name: "field-4",
          description: "field-4 description",
          type: "text"
        },
        {
          name: "field-5",
          description: "field-5 description",
          type: "number"
        }
      ]
    }

    let chosen_form = this.state.is_1 ? my_form_1 : my_form_2;
    return (
      <div>
        <DynamicForm form={chosen_form} send_form={no_operation} />
        <button onClick={this.on_click_handler}>Change Form</button>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>This is my APP</p>
        <ChangeForm />
      </header>
    </div>
  );
}

export default App;
