"use strict";

module.exports = {
    toCamelCase: obj => {
        let newObj = {}
        for (const property in obj) {
            newObj[snakeToCamel(property)] = obj[property]
        }
        return newObj;
    }
}

const snakeToCamel = (str) => str.replace(
    /([-_][a-z])/g,
    (group) => group.toUpperCase()
        .replace('-', '')
        .replace('_', '')
);