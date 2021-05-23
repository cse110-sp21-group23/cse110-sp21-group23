"use strict";

module.exports = {
    toCamelCase: function (obj) {
        return toCamelCaseInner(obj);
    },
    validateEmail: (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    },
    htttpError: (res, err) => {
        res.status(400).send({
            error: err 
        })
    },
    httpSuccess: (res) => {
        res.send("success")
    }
}

const toCamelCaseInner = (obj) => {
    if (isObject(obj)) {
        const n = {};

        Object.keys(obj)
            .forEach((k) => {
                n[snakeToCamel(k)] = toCamelCaseInner(obj[k]);
            });

        return n;
    } else if (Array.isArray(obj)) {
        return obj.map((i) => {
            return toCamelCaseInner(i);
        });
    }
    return obj;
}

const snakeToCamel = (str) => str.replace(
    /([-_][a-z])/g,
    (group) => group.toUpperCase()
        .replace('-', '')
        .replace('_', '')
);

const isObject = function (obj) {
    return (obj instanceof Date) && obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function';
};