const replaceAt = require('../helpers.js').replaceAt;

const typeModel = {
  int: 'number',
  varchar: 'string',
  char: 'string',

};


class DatabaseDataValidator {
  constructor(schema) {
    this.validationSchema = this._parseSchema(schema);
  }

  _parseSchema(schema) {
    const tables = schema.tables;
    for (const tableName in tables) {
      const table = tables[tableName];
      const tableValidator = {};
      for (const field in table) {
        let type = table[field];
        type = type.substr(0, type.length - 1).split('(');
        tableValidator[field] = this._createValidationFunc(type);
      }
      schema.tables[tableName] = tableValidator;
    }
    return schema;
  }

  _createValidationFunc(type) {
    const jsType = typeModel[type[0]];
    const maxLen = +type[1];
    return (val) => {
      console.log('val:', val)
      console.log('valLen:', Number.valueOf(val).length)
      if (typeof val !== jsType) return false;
      if (jsType === 'string' && val.length > maxLen) return false;
      if (jsType === 'number' && Number.valueOf(val).length > maxLen) return false;
      return true;
    };
  }

  validate = (tableName, field, val) => this.validationSchema.tables[tableName][field](val);

}

module.exports.default = DatabaseDataValidator;
