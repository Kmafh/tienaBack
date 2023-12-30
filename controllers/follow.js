const { response } = require('express');

const Follow = require('../models/follow');

const getFollows = async(req, res = response) => {
    const uid = req.params.uid;
    
    try {
        const follows = await Follow.find({ uid: uid })
        res.json({
            ok: true,
            follows
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}

const getFollowById = async(req, res = response) => {
    const id = req.params.id;
    try {
        const follow = await  Follow.find({ id: id })

        res.json({
            ok: true,
            follow
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}
const getFollowByPid = async(req, res = response) => {
    const pid = req.params.pid;
    console.log("Dentro:"+pid)
    try {
        const follow = await  Follow.find({ pid: pid })

        res.json({
            ok: true,
            follow
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
}
const crearFollow = async (req, resp = response) => {
    const uid = req.uid;
    const follow = new Follow({
        usuario: uid,
        ...req.body
    });
     follow.createAt= new Date()
    try {
        const followDB = await follow.save();
        resp.json({
            ok: true,
            follow: followDB
        })

    } catch (error) {
        console.log(error);
        resp.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarFollow = async(req, res = response) => {
    const id  = req.params.id;
    const uid = req.uid;
    try {
        const follow = await Follow.findById( id );
        if ( !follow ) {
            return res.status(404).json({
                ok: true,
                msg: 'Follow no encontrado por id',
            });
        }
        const cambiosFollow = {
            ...req.body,
            usuario: uid
        }
        const followActualizado = await Follow.findByIdAndUpdate( id, cambiosFollow, { new: true } );
        res.json({
            ok: true,
            follow: followActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const borrarFollow = async (req, res = response) => {
    const id  = req.params.id;
    try {
        const follow = await Follow.findById( id );
        if ( !follow ) {
            return res.status(404).json({
                ok: true,
                msg: 'Follow no encontrado por id',
            });
        }
        await Follow.findByIdAndDelete( id );
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
    getFollows,
    crearFollow,
    actualizarFollow,
    borrarFollow,
    getFollowById,
    getFollowByPid
}