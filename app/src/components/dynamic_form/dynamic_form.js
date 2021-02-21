import React from 'react';
import FormField from '../form_field/form_field';

class DynamicForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {fields: []};
    }

    validate_form = () => {
        let errors = [];

        this.state.fields.forEach(field_element => {
            let valid_value = field_element.validate_value();
            if(!valid_value)
            {
                errors.push(field_element);
            }
            field_element.notify_invalid_value(valid_value);  // in case this field was invalid,
                                                              // this action will mark it back to valid,
                                                              // and in case it is now invalid, it will
                                                              // trigger invalid render.
        })
        return errors;
    }

    to_json = () => {
        var output = {};
        this.state.fields.forEach((field) => {
            output[field.get_key()] = field.get_value();
        })
        return JSON.stringify(output);
    }

    send_form = (event) => {
        event.preventDefault();  // will prevent the reset of the app

        let errors = this.validate_form();
        if(errors.length > 0)
        {
            let errors_str = "The following errors were found in the form:\n";
            errors.forEach(invalid_field => {
                errors_str += invalid_field.generate_error_msg() + "\n";
            })
            errors_str += "Please fix the errors before sending the form";
            alert(errors_str);
            return;
        }

        let form_data = this.to_json();
        this.props.send_form(form_data);
        alert("form sent!\n" + form_data);
    }

    generate_fields = (form_schema) => {
        var default_mandatory = true;
        if('default_mandatory' in form_schema) {
            default_mandatory = form_schema.default_mandatory;
        }
        var output = []
        form_schema.fields.forEach(field => {
                if(!('mandatory' in field))  // add mandatory by default
                {
                    field['mandatory'] = default_mandatory;
                }
                let form_field = <FormField key={field.name}
                                            field_data={field}
                                            form_ref={this} />

                output.push(form_field);
        });
        return output;
    }

    register_field = (field_to_register) => {
        this.setState((prev_state) => {
            if(field_to_register.registered)
            {
                return;
            }

            field_to_register.registered = true;
            let new_fields = prev_state.fields;
            new_fields.push(field_to_register);
            console.log(new_fields);
            return {fields: new_fields};
        })
    }

    shouldComponentUpdate(prev_props, prev_state) {
        if(this.props !== prev_props) {
            this.setState({fields: []});  // removing all previous fields
            return true;
        }
        else {
            return false;
        }
    }

    render() {
        let form_fields = this.generate_fields(this.props.form);
        return (
            <div>
                <form onSubmit={this.send_form}>
                    {form_fields}
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }

};

export default DynamicForm;