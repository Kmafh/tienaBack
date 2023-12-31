/*
    Products
    ruta: '/api/product'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getProducts,
    crearProduct,
    actualizarProduct,
    borrarProduct,
    getProductById,
    getProductsByUID
} = require('../controllers/products')


const router = Router();

router.get( '/:uid',validarJWT, getProductsByUID);
router.get( '/', getProducts);

router.post( '/',
    [
        validarJWT,
        check('title','El name del registro es necesario').not().isEmpty(),
        check('stock','El name del registro es necesario').not().isEmpty(),
        check('price','El name del registro es necesario').not().isEmpty(),
        check('createAt','El name del registro es necesario').not().isEmpty(),
        check('category','El name del registro es necesario').not().isEmpty(),
        check('img','El name del registro es necesario').not().isEmpty(),
        check('uid','El name del registro es necesario').not().isEmpty(),
        check('description','El name del registro es necesario').not().isEmpty(),
        validarCampos
    ], 
    crearProduct 
);

router.put( '/:id',
    [
        validarJWT,
        check('id','El hospital id debe de ser válido').not().isEmpty(),
        validarCampos
    ],
    actualizarProduct
);

router.delete( '/:id',
    validarJWT,
    borrarProduct
);

router.get( ':id',
    getProductById
);



module.exports = router;



