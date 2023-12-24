/*
    Likes
    ruta: '/api/like'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getLikes,
    crearLike,
    actualizarLike,
    borrarLike,
    getLikeById
} = require('../controllers/likes')


const router = Router();

router.get( '/:uid', validarJWT, getLikes);

router.post( '/',
    [
        validarJWT,
        check('origin','El name del registro es necesario').not().isEmpty(),
        
        validarCampos
    ], 
    crearLike 
);

router.put( '/:id',
    [
        validarJWT,
        check('origin','El name del médico es necesario').not().isEmpty(),
        check('cant','El hospital id debe de ser válido').not().isEmpty(),
        validarCampos
    ],
    actualizarLike
);

router.delete( '/:id',
    validarJWT,
    borrarLike
);

router.get( ':id',
    validarJWT,
    getLikeById
);



module.exports = router;



