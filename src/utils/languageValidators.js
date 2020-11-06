const {body, param, check} = require('express-validator');
const checkSchema = require('./checkSchema');

//checking left to right or right to left


const validate = (method) => {
    switch (method) {
        case 'getLanguages': {
            return [
                /* ------------------- Schema Validation ------------------- */
                body(' ').custom((value, {req}) => {
                    const schemas = [undefined];
                    if (checkSchema(schemas, req)) {
                        return true;
                    }

                }),
                /* ------------------- End Schema Validation ------------------- */
            ];
        }
        case 'getLanguageById': {
            return [
                /* ------------------- Schema Validation ------------------- */
                body(' ').custom((value, {req}) => {
                    const schemas = [undefined];
                    if (checkSchema(schemas, req)) {
                        return true;
                    }

                }),
                /* ------------------- End Schema Validation ------------------- */

                /* ------------------- Id Validation ------------------- */
                param('id').isMongoId(),
                /* ------------------- End Id Validation ------------------- */
            ];
        }
        case 'postLanguage': {
            return [
                /* ------------------- Schema Validation ------------------- */
                body(' ')
                    .custom((value, {req}) => {
                        const schemas = ['title', 'code', 'direction'];

                        if (checkSchema(schemas, req)) {
                            return true;
                        }
                    }),

                /* ------------------- End Schema Validation ------------------- */

                /* ------------------- direction Validation ------------------- */
                body('direction', 'direction must exits and be of type string').exists().isString(),
                body('direction', 'direction cannot be empty string').not().isEmpty(),
                body('direction', 'direction cannot be empty string').not().equals(' '),
                check('direction', 'direction must have value of ltr or rtl only').isIn(['ltr', 'rtl']),
                /* ------------------- End direction Validation ------------------- */
            ];
        }
    }

}

module.exports = validate;


