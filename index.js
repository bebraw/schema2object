'use strict';

var camelCase = require('change-case').camelCase;
var fp = require('annofp');
var generate = require('annogenerate');
var math = require('annomath');


exports.getRequiredProperties = function(definition) {
    var required = definition.required;

    if(!required) {
        return console.trace('missing required properties');
    }

    return fp.filter(function(k) {
        return required.indexOf(k) >= 0;
    }, definition.properties);
};

exports.properties2object = properties2object;
function properties2object(properties, definitions) {
    if(!properties) {
        return console.trace('missing properties');
    }

    definitions = definitions || {};
    properties = resolveRefs(properties, definitions);

    return fp.map(function(k, v) {
        if(v.enum) {
            return math.pick(v.enum);
        }

        if(v.type) {
            if(v.type === 'array') {
                var name = getReferenceName(v.items && v.items.$ref);
                var def = definitions[name];
                var generator;

                if(def) {
                    generator = function() {
                        return properties2object(definitions, def.properties);
                    };
                }

                return generate.array([v.minItems, v.maxItems], generator);
            }

            if(v.type === 'string' && v.format) {
                return generate[camelCase(v.format)]();
            }

            return generate[v.type]();
        }

        console.warn('missing enum or type for', v);
    }, properties);
}

function resolveRefs(properties, definitions) {
    if(!definitions) {
        return properties;
    }

    return fp.map(function(k, v) {
        if(v.$ref) {
            var name = getReferenceName(v.$ref);
            var def = definitions[name];

            if(def) {
                return def;
            }

            return console.warn('missing reference for', name);
        }

        return v;
    }, properties);
}

function getReferenceName(ref) {
    if(ref) {
        return ref.split('/').slice(-1)[0];
    }
}
