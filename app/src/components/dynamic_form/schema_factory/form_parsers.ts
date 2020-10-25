import FormFieldMetadata from '../../form_field/form_field';

interface BaseParser {
    parse(schema: string) : [FormFieldMetadata];
}

class JsonParser implements BaseParser {
    parse(schema: string) {
        let output: [FormFieldMetadata] = [];
        return output;
    }
}

export default { JsonParser };

