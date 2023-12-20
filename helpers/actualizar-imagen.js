const Usuario = require('../models/usuario');
const Product = require('../models/product');
const fs = require('fs');


const borrarImagen = ( path ) => {
    console.log("fuera: "+path)

    if ( fs.existsSync( path ) && path !=='./uploads/incomes/' ) {
        // borrar la imagen anterior
        console.log("Dentro: "+path)
        fs.unlinkSync( path );
    }
}


const actualizarImagen = async(tipo, id, nameArchivo) => {

    let pathViejo = '';
    
    switch( tipo ) {
        case 'product':
            const product = await Product.findById(id);
            console.log('Product: '+product);
            console.log('ID: '+id);
            
            if ( !product ) {
                console.log('No es un médico por id');
                return false;
            }

            pathViejo = `./uploads/productos/${ product.img }`;

            borrarImagen( pathViejo );
            product.img = nameArchivo;
            await product.save();
            return true;

        break;
        
        
        
        case 'usuarios':

            const usuario = await Usuario.findById(id);
            if ( !usuario ) {
                console.log('No es un usuario por id');
                return false;
            }
            if(usuario.img !== "perfil.png"){
                pathViejo = `./uploads/usuarios/${ usuario.img }`;
                borrarImagen( pathViejo );
            }
            usuario.img = nameArchivo;
            await usuario.save();
            return true;
        break;

        case 'fondo':

        const user = await Usuario.findById(id);
        if ( !user ) {
            console.log('No es un usuario por id');
            return false;
        }
        console.log("Fondo: "+user.fondo)
        if(user.fondo !== "user-info.jpg"){
            pathViejo = `./uploads/fondo/${ user.img }`;
            borrarImagen( pathViejo );
        }
        user.fondo = nameArchivo;
        await user.save();
        return true;

    break;
    }


}



module.exports = { 
    actualizarImagen
}
