const nodemailer = require('nodemailer');
const { sendMail } = require('../controllers/auth');


const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_ID,
        refreshToken: process.env.GOOGLE_SECRET,
        accessToken: process.env.GOOGLE_ACCESS_TOKEN,
    }
})

async function sendMailVerification(direccion, token) {
    console.log("DEntro")
    try{
        transporter.sendMail({
            from: '"Registro Vaidno Pro 👻" <artadapt@gmail.com>',
            to: `${direccion}`,
            subject: "Registro Vaidno Pro 👻",
            html: createMailVerification(token) // html body
        });
        async function createMailVerification(token) {
            return `<b>Estas a un paso de unirte a Vaidno. Pincha en el este enlace para confirmar el registro.</b>
            <a href='${token}/register?name=${token}&email=${token}&password=${token}'>${token}</a>`;
          }
    }catch(error) {
        console.log("eoooo"+error);
        res.json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    
}
module.exports = {
    sendMailVerification
}