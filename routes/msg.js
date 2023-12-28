/*
    Msgs
    ruta: '/api/msg'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getMsgs,
    crearMsg,
    actualizarMsg,
    borrarMsg,
    getMsgById
} = require('../controllers/msg')


const router = Router();

router.get( '/:uid', validarJWT, getMsgs);

router.post( '/',
    [
        validarJWT,
        check('origin','El name del registro es necesario').not().isEmpty(),
        
        validarCampos
    ], 
    crearMsg 
);

router.put( '/:id',
    [
        validarJWT,
        check('origin','El name del médico es necesario').not().isEmpty(),
        check('cant','El hospital id debe de ser válido').not().isEmpty(),
        validarCampos
    ],
    actualizarMsg
);

router.delete( '/:id',
    validarJWT,
    borrarMsg
);

router.get( ':id',
    validarJWT,
    getMsgById
);



module.exports = router;



