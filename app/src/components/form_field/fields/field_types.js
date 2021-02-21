import React from 'react';
import BaseField from './base_field';
import './fields_style.css';

class TextField extends BaseField {

    validate_value = () => {
        if(!this.mandatory_validation(this.state.value)) {
            return false;
        }
        else if(!this.validate_regex()) {
            return false;
        }
        else if(!this.validate_allowed_values()) {
            return false;
        }
        else {
            return true;
        }
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
        return this.mandatory_validation(this.state.value);
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
        if(!this.mandatory_validation(this.state.value)) {
            return false;
        }
        else if(isNaN(this.state.value)) {
            return false;
        }
        else if(!(this.validate_max_value() && this.validate_min_value())) {
            return false;
        }
        else {
            return true;
        }
    }

    generate_error_msg = () => {
        return "NumberField " + "'" + this.props.inner_props.name + "' has invalid value";
    }
}

class RangeField extends BaseField {
    handleChangeMin = (event) => {
        var value = event.target.value;
        this.setState((prev_state => {
            let current_value = prev_state.value;
            let new_value = [];
            if(current_value !== null)
            {
                new_value = current_value;
            }
            else
            {
                new_value[0] = null;
                new_value[1] = null;
            }
            new_value[0] = value;
            return {value: new_value};
        }))
    }
    render() {
        let component = (<div>
                            <input type="text"
                                   name={this.props.inner_props.name + "_min"}
                                   onChange={this.handleChangeMin} />
                            <input type="text"
                                   name={this.props.inner_props.name + "_max"}
                                   onChange={this.handleChangeMax} />
                         </div>)
        let rendered_component = this.render_component(component);
        return rendered_component;
    }
}

export {TextField, PickerField, NumberField};