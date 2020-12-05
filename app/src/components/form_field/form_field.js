import React from 'react';
import FieldFactory from './field_factory';

class FormField extends React.Component {
    constructor(props) {
        super(props);

        this.registered = false;  // inner flag for field-registration
        this.state = {
            value_ref: null,      // reference to the field value object
            is_invalid: null,     // flag to indicate if the value-ref has invalid value
        }
    }

    /* Generation methods */

    generate_error_msg = () => {
        if(this.state.value_ref == null)
        {
            return "field '" + this.props.field_data.name + "' does not have value yet";
        }

        return this.state.value_ref.generate_error_msg()
    }

    get_key = () => {
        return this.props.field_data.name;
    }

    /* Parent component callbacks */

    notify_invalid_value = (is_invalid) => {
        if(this.state.value_ref == null)
        {
            return;
        }

        this.setState({is_invalid: is_invalid});
        this.state.value_ref.notify_invalid_value(is_invalid);
    }

    get_value = () => {
        if(this.state.value_ref == null){
            return null;
        }

        return this.state.value_ref.get_value()
    }

    validate_value = () => {
        if(this.state.value_ref == null)
        {
            return false;
        }

        return this.state.value_ref.validate_value();
    }

    /* Child component value callbacks */

    register_field_value_component = (field_value_reference) => {
        this.setState({value_ref: field_value_reference});
    }

    /* rendering methods */

    componentDidMount() {
        // register the field to the form inorder to fetch values
        this.props.form_ref.register_field(this, this.props.field_data.name);
    }

    shouldComponentUpdate(prev_props, prev_state){
        return false;  // we dont want to rerender this component ever.
                       // This component will be rendered only on constructing a new one
    }

    render(){
        let field_data = this.props.field_data;
        const Field = FieldFactory.get_field(field_data.type);

        return (
            <div>
                <Field inner_props={field_data}
                       field_reference={this} />
            </div>
        );
    }
}

export default FormField;