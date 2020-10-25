import FormField from './FormField';

enum FieldType {
    STRING,
    OPTIONS,
    NUMBER
}

const FieldTypeTranslator = {
    'string': FieldType.STRING,
    'options': FieldType.OPTIONS,
    'number': FieldType.NUMBER
}

declare function FormField(prop: {name: string,
                                  description: string,
                                  type: FieldType});

class FormFieldMetadata {
    public id: number;
    public name: string;
    public description: string;
    public type: FieldType;

    constructor(id: number,
                name: string,
                description: string,
                type: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = FieldTypeTranslator[type];
    }

    generate_field() : <FormField /> {
        let output_field = <FormField name={this.name},
                                      description={this.description},
                                      type={this.type} />;
        return output_field
    }
};

export default { FormField, FormFieldMetadata };