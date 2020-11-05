const {body, param, check} = require('express-validator');
const checkSchema = require('./checkSchema');

//checking left to right or right to left
check('direction').isIn(['ltr', 'rtl']);

const validate = (method) => {
    switch (method) {
        case 'getLanguages': {
            return [
                body(' ').custom((value, {req}) => {
                    const schemas = [undefined];
                    if (checkSchema(schemas, req)) {
                        return true;
                    }

                }),
            ];
        }
        case 'getLanguageById': {
            return [
                body(' ').custom((value, {req}) => {
                    const schemas = [undefined];
                    if (checkSchema(schemas, req)) {
                        return true;
                    }

                }),
                param('id').isMongoId(),
            ];
        }
    }

}

module.exports = validate;


