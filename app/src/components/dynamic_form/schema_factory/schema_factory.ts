import SchemaType from '../../consts';
import JsonParser from './form_parsers/json_parser'

class SchemaFactory {
    static parsers = {
        SchemaType.JSON: JsonParser
    }

    static gen_fields(form_schema, schema_type) {
        
    }
}