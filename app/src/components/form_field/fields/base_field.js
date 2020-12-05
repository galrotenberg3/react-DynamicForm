import React from 'react';

class BaseField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,        // the field actual value
            show_invalid: null  // flag to generate additional data to user to mark the field as invalid
        }
    }

    handleChange = (event) => {
        this.setState({value: event.target.value});
    }

    get_value = () => {
        return this.state.value;
    }

    validate_value = () => {
        console.log("Not Implemented!");
        return;
    }

    notify_invalid_value = (show_invalid) => {
        this.setState({show_invalid: show_invalid});
    }

    generate_error_msg = () => {
        console.log("Not Implemented!");
        return;
    }

    componentDidMount() {
        this.props.field_reference.register_field_value_component(this);
    }

    shouldComponentUpdate(prev_props, prev_state){
        if(prev_state.show_invalid && !this.state.show_invalid) {
            return true;
        }
        else if (prev_state.value !== this.state.value) {
            return true;
        } else {
            return false;
        }
    }

    render(){
        console.log("Not Implemented!");
        return;
    }
}

export default BaseField;