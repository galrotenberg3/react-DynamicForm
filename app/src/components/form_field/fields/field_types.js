import React from 'react';
import BaseField from './base_field';

class TextField extends BaseField {

    validate_value = () => {
        return this.state.value !== null;
    }

    generate_error_msg = () => {
        return "TextField " + "'" + this.props.inner_props.name + "' has invalid value";
    }

    render() {
        return (
            <div>
                <label style={{display: "flex", flexDirection: "column"}}>
                    {this.props.inner_props.name}
                    <input type='text'
                           name={this.props.inner_props.name}
                           onChange={this.handleChange} />
                </label>
            </div>
        );
    }
}

class PickerField extends BaseField {

    validate_value = () => {
        return true;
    }

    generate_error_msg = () => {
        return "PickerField " + "'" + this.props.inner_props.name + "' has invalid value";
    }

    render() {
        let options = this.props.inner_props.options.map((opt, idx) => {
            return <option index={idx} value={opt} key={opt}>{opt}</option>
        })
        return (
            <div>
                <label style={{display: "flex", flexDirection: "column", padding: 15}}>
                    {this.props.inner_props.name}
                    <select onChange={this.handleChange}>
                        {options}
                    </select>
                </label>
            </div>
        );
    }
}

class NumberField extends TextField {
    validate_value = () => {
        let current_value = this.state.value;
        return !isNaN(current_value);
    }

    generate_error_msg = () => {
        return "NumberField " + "'" + this.props.inner_props.name + "' has invalid value";
    }
}

export {TextField, PickerField, NumberField};