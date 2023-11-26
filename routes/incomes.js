/*
    Incomes
    ruta: '/api/income'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getIncomes,
    crearIncome,
    actualizarIncome,
    borrarIncome,
    getIncomeById
} = require('../controllers/incomes')


const router = Router();

router.get( '/:uid', validarJWT, getIncomes);

router.post( '/',
    [
        validarJWT,
        check('origin','El name del registro es necesario').not().isEmpty(),
        
        validarCampos
    ], 
    crearIncome 
);

router.put( '/:id',
    [
        validarJWT,
        check('origin','El name del médico es necesario').not().isEmpty(),
        check('cant','El hospital id debe de ser válido').not().isEmpty(),
        validarCampos
    ],
    actualizarIncome
);

router.delete( '/:id',
    validarJWT,
    borrarIncome
);

router.get( ':id',
    validarJWT,
    getIncomeById
);



module.exports = router;



