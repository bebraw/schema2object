[![build status](https://secure.travis-ci.org/bebraw/schema2object.png)](http://travis-ci.org/bebraw/schema2object)
# schema2object - Generate random objects based on JSON Schema

Usage:

```javascript
// it is possible to replace generators with something else
// just implement {<json schema property> -> fn} where fn should return
// a generated value
var generators = require('annogenerate');

var schema2object = require('schema2object');
var definitions = ...; // Object of JSON schemas (name -> schema)
var definition = ...; // JSON Schema


var properties = definition.properties;

// if you want, you can generate data only for required fields
if(definition.required) {
    properties = schema2object.getRequiredProperties(definition);
}

var o = schema2object.properties2object({
    generators: generators,
    // fieldGenerators - optional generators that match per field name
    properties: properties,
    definitions: definitions // optional definitions for checking against $ref
});

// you should have an object with random data now
console.log(o);
```

See `/demo` for a more comprehensive example.

## License

`schema2object` is available under MIT. See LICENSE for more details.

