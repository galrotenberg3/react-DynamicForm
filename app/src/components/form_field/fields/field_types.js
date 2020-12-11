import React from 'react';
import BaseField from './base_field';
import './fields_style.css';

class TextField extends BaseField {

    validate_value = () => {
        return this.state.value !== null;
    }

    generate_error_msg = () => {
        return "TextField " + "'" + this.props.inner_props.name + "' has invalid value";
    }

    render() {
        let component = <input className="InnerField"
                               type='text'
                               name={this.props.inner_props.name}
                               onChange={this.handleChange} />;
        let rendered_component = this.render_component(component);
        return rendered_component;
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

        let component = (<select onChange={this.handleChange} className="Field">{options}</select>);
        let rendered_component = this.render_component(component);
        return rendered_component;
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