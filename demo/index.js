'use strict';

var math = require('annomath');
var random = require('seed-random')('baz');

var generators = require('annogenerate')(function(min, max) {
    return math.randint(min, max, random);
});
patchGenerators(generators);

var schema2object = require('../');
var definitions = require('./definitions');


main();

function main() {
    Object.keys(definitions).forEach(function(name) {
        var o = getObject(definitions, name);

        if(o) {
            console.log(name + ':\n', JSON.stringify(o, null, 4), '\n');
        }
    });
}

function getObject(definitions, name) {
    var fieldGenerators = getFieldGenerators();
    var definition = definitions[name];
    var properties = definition.properties;

    if(!properties) {
        return;
    }

    if(definition.required) {
        properties = schema2object.getRequiredProperties(definition);
    }

    return schema2object.properties2object({
        generators: generators,
        fieldGenerators: fieldGenerators,
        properties: properties,
        definitions: definitions
    });
}

function patchGenerators(generators) {
    generators.integer = generators.integer.bind(null, 0, 1000);
    generators.number = generators.number.bind(null, 0, 1000);
    generators.string = generators.string.bind(null, 20);
}

function getFieldGenerators() {
    var generators = {};

    generators.description = function() {
        return 'Description goes here...';
    };

    generators.name = function() {
        var forenames = ['Jack', 'Joe', 'Jill', 'Dan', 'Mack', 'Mike', 'Don', 'Grace'];
        var surnames = ['Johnson', 'Dill', 'Tully', 'Robertson', 'Hill', 'Yellow'];

        return math.pick(forenames) + ' ' + math.pick(surnames);
    };

    return generators;
}
