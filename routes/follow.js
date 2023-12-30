/*
    Follows
    ruta: '/api/follow'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getFollows,
    crearFollow,
    actualizarFollow,
    borrarFollow,
    getFollowById,
    getFollowByPid
} = require('../controllers/follow')


const router = Router();

router.get( '/:uid', validarJWT, getFollows);
router.get( '/id/:id', validarJWT, getFollowById);
router.get( '/pid/:pid', validarJWT, getFollowByPid);


router.post( '/',
    [
        validarJWT,
        check('origin','El name del registro es necesario').not().isEmpty(),
        
        validarCampos
    ], 
    crearFollow 
);

router.put( '/:id',
    [
        validarJWT,
        check('origin','El name del médico es necesario').not().isEmpty(),
        check('cant','El hospital id debe de ser válido').not().isEmpty(),
        validarCampos
    ],
    actualizarFollow
);

router.delete( '/:id',
    validarJWT,
    borrarFollow
);

router.get( ':id',
    validarJWT,
    getFollowById
);



module.exports = router;



