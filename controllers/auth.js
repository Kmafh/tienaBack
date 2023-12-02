const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { transporter } = require('../helpers/email');
const { sendMailVerification } = require('../services/mail.services');


const login = async( req, res = response ) => {
    const { email, password } = req.body;
    try {
        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }
        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales erroneas'
            });
        }
        // Generar el TOKEN - JWT
        const token = await generarJWT( usuarioDB.id );
        const usuario = await Usuario.findOne({ email });

        res.json({
            ok: true,
            token,
            usuario
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const googleSignIn = async( req, res = response ) => {
    const googleToken = req.body.token;
    try {
        const { name, email, picture } = await googleVerify( googleToken );
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        if ( !usuarioDB ) {
            // si no existe el usuario
            usuario = new Usuario({
                name: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            // existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en DB
        await usuario.save();
        // Generar el TOKEN - JWT
        const token = await generarJWT( usuario.id );
        res.json({
            ok: true,
            token
        });

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no es correcto',
        });
    }
}
// Envio email
        // 


const sendMail = async( req, res = response ) => {
    const { email, password, name } = req.body;
    verificationLink = "http://localhost:3000/api"
    try {
        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });
        if ( usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email registrado'
            });
        }
        // Verificar contraseña
        const salt = bcrypt.genSaltSync();
        const validPassword = bcrypt.hashSync( password, salt );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }
       const mail = await sendMailVerification(email,"TOken de prueba")
              
        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const renewToken = async(req, res = response) => {

    try {
        const uid = req.uid;
        // Generar el TOKEN - JWT
        const token = await generarJWT( uid );
        // Obtener el usuario por UID
        const usuario = await Usuario.findById( uid );
        res.json({
            ok: true,
            token,
            usuario
        });
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: 'Hable con el administrador'
        })
    }
    
}

module.exports = {
    login,
    googleSignIn,
    renewToken,
    sendMail
}
