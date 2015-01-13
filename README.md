[![build status](https://secure.travis-ci.org/bebraw/schema2object.png)](http://travis-ci.org/bebraw/schema2object)
# schema2object - Generate random objects based on JSON Schema

Usage:

```javascript
var schema2object = require('schema2object');
var definitions = ...; // Object of JSON schemas (name -> schema)
var definition = ...; // JSON Schema


var properties = definition.properties;

// if you want, you can generate data only for required fields
if(definition.required) {
    properties = schema2object.getRequiredProperties(definition);
}

// definitions can be passed so that $ref lookups work
// in case your properties don't have any, you can skip it
var o = schema2object.properties2object(properties, definitions);

// you should have an object with random data now
console.log(o);
```

See `/demo` for a more comprehensive example.

## License

`schema2object` is available under MIT. See LICENSE for more details.

