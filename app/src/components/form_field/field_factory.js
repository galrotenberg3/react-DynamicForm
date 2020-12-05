import {
    TextField,
    PickerField,
    NumberField
} from './fields/field_types';

class FieldFactory {
    static get_field(field_type) {
        switch(field_type)
        {
            case "text":
                return TextField;
            case "picker":
                return PickerField;
            case "number":
                return NumberField;
            default:
                console.log(field_type + "unsupported type");
                return null;
        }
    }
}

export default FieldFactory;