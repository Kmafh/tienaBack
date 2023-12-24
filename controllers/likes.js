const { response } = require('express');

const Like = require('../models/like');

const getLikes = async(req, res = response) => {
    const uid = req.params.uid;
    
    try {
        const likes = await Like.find({ uid: uid })
        res.json({
            ok: true,
            likes
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const getLikeById = async(req, res = response) => {
    const id = req.params.id;
    try {
        const like = await Like.findById(id)
        res.json({
            ok: true,
            like
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearLike = async (req, resp = response) => {
    const uid = req.uid;
    const like = new Like({
        usuario: uid,
        ...req.body
    });
     like.createAt= new Date()
    try {
        const likeDB = await like.save();
        resp.json({
            ok: true,
            like: likeDB
        })

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarLike = async(req, res = response) => {
    const id  = req.params.id;
    const uid = req.uid;
    try {
        const like = await Like.findById( id );
        if ( !like ) {
            return res.status(404).json({
                ok: true,
                msg: 'Like no encontrado por id',
            });
        }
        const cambiosLike = {
            ...req.body,
            usuario: uid
        }
        const likeActualizado = await Like.findByIdAndUpdate( id, cambiosLike, { new: true } );
        res.json({
            ok: true,
            like: likeActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarLike = async (req, res = response) => {
    const id  = req.params.id;
    try {
        const like = await Like.findById( id );
        if ( !like ) {
            return res.status(404).json({
                ok: true,
                msg: 'Like no encontrado por id',
            });
        }
        await Like.findByIdAndDelete( id );
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
    getLikes,
    crearLike,
    actualizarLike,
    borrarLike,
    getLikeById
}