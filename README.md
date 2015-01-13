[![build status](https://secure.travis-ci.org/bebraw/schema2object.png)](http://travis-ci.org/bebraw/schema2object)
# schema2object - Utilities to help convert JSON Schemas to Objects

Usage:

```javascript
var schema2object = require('schema2object');
var definition = ...; // Object of JSON schemas (name -> schema)
var definition = ...; // JSON Schema


var properties = definition.properties;

// if you want, you can generate data only for required fields
if(definition.required) {
    properties = schema2object.getRequiredProperties(definition);
}

// all definitions are passed so that $ref lookup can work properly
var o = schema2object.properties2object(definitions, properties);

// you should have an object with random data now
console.log(o);
```

See `/demo` for a more comprehensive example.

## License

`schema2object` is available under MIT. See LICENSE for more details.

