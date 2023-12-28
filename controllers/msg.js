const { response } = require('express');

const Msg = require('../models/msg');

const getMsgs = async(req, res = response) => {
    const uid = req.params.uid;
    
    try {
        const msgs = await Msg.find({ uid: uid })
        res.json({
            ok: true,
            msgs
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const getMsgById = async(req, res = response) => {
    const id = req.params.id;
    try {
        const msg = await Msg.findById(id)
        res.json({
            ok: true,
            msg
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const crearMsg = async (req, resp = response) => {
    const uid = req.uid;
    const msg = new Msg({
        usuario: uid,
        ...req.body
    });
     msg.createAt= new Date()
    try {
        const msgDB = await msg.save();
        resp.json({
            ok: true,
            msg: msgDB
        })

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarMsg = async(req, res = response) => {
    const id  = req.params.id;
    const uid = req.uid;
    try {
        const msg = await Msg.findById( id );
        if ( !msg ) {
            return res.status(404).json({
                ok: true,
                msg: 'Msg no encontrado por id',
            });
        }
        const cambiosMsg = {
            ...req.body,
            usuario: uid
        }
        const msgActualizado = await Msg.findByIdAndUpdate( id, cambiosMsg, { new: true } );
        res.json({
            ok: true,
            msg: msgActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarMsg = async (req, res = response) => {
    const id  = req.params.id;
    try {
        const msg = await Msg.findById( id );
        if ( !msg ) {
            return res.status(404).json({
                ok: true,
                msg: 'Msg no encontrado por id',
            });
        }
        await Msg.findByIdAndDelete( id );
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
    getMsgs,
    crearMsg,
    actualizarMsg,
    borrarMsg,
    getMsgById
}