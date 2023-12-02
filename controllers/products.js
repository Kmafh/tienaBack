const { response } = require('express');

const Product = require('../models/product');

const getProducts = async(_req, res = response) => {
    
    try {
        const products = await Product.find()
        res.json({
            ok: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const getProductsByUID = async(req, res = response) => {
    const uid = req.params.uid;
    
    try {
        const products = await Product.find({ uid: uid })
        res.json({
            ok: true,
            products
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const getProductById = async(req, res = response) => {
    const id = req.params.id;
    try {
        const product = await Product.findById(id)
        res.json({
            ok: true,
            product
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearProduct = async (req, resp = response) => {
    const uid = req.uid;
    const product = new Product({
        usuario: uid,
        ...req.body
    });
     product.createAt= new Date()
    try {
        const productDB = await product.save();
        resp.json({
            ok: true,
            product: productDB
        })

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarProduct = async(req, res = response) => {
    const id  = req.params.id;
    const uid = req.uid;
    try {
        const product = await Product.findById( id );
        if ( !product ) {
            return res.status(404).json({
                ok: true,
                msg: 'Product no encontrado por id',
            });
        }
        const cambiosProduct = {
            ...req.body,
            usuario: uid
        }
        const productActualizado = await Product.findByIdAndUpdate( id, cambiosProduct, { new: true } );
        res.json({
            ok: true,
            product: productActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarProduct = async (req, res = response) => {
    const id  = req.params.id;
    try {
        const product = await Product.findById( id );
        if ( !product ) {
            return res.status(404).json({
                ok: true,
                msg: 'Product no encontrado por id',
            });
        }
        await Product.findByIdAndDelete( id );
        res.json({
            ok: true,
            msg: 'Médico borrado'
        }); 
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getProducts,
    crearProduct,
    actualizarProduct,
    borrarProduct,
    getProductById,
    getProductsByUID
}