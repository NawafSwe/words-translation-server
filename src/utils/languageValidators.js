const {body, param, check} = require('express-validator');

//checking left to right or right to left
check('direction').isIn(['ltr', 'rtl']);
