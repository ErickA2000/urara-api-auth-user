import { Request, Response, NextFunction } from 'express'
import { listParams } from '@Constants/global';
import { ROLES } from '@Constants/global';
import { authDAO } from '@DAO/Auth.dao';
import { usuarioDao } from '@DAO/Usuario.dao';
import { CODES_HTTP } from '@Constants/global';

export const verificarExisteUsernameOemail = async ( req: Request, res: Response, next: NextFunction ) => {
    const user = await authDAO.getUserByUsername( req.body.username );
    if( user ) return res.status(CODES_HTTP.BAD_REQUEST).json({ 
        success: false,
        message: 'El usuario ya existe' 
    })

    const email = await usuarioDao.getUserByEmail( req.body.email );
    if( email ) return res.status(CODES_HTTP.BAD_REQUEST).json({
         success: false,
         message: 'El email ya existe' 
        })

    next()
}

export const verificarExisteRol = ( req: Request, res: Response, next: NextFunction ) => {
    if( req.body.roles ){
        for( let i = 0; i < req.body.roles.length; i++ ){
            if( !ROLES.includes(req.body.roles[i]) ){
                return res.status(CODES_HTTP.BAD_REQUEST).json( {
                    success: false,
                    message: `El rol ${req.body.roles[i]} no existe`
                } )
            }
        }   
    }

    next();
}

export const verificarCamposObligatoriosRegistroUsuario = ( req: Request, res: Response, next: NextFunction ) => {
    const { nombre, email, username, clave } = req.body;

    if( nombre === undefined || email === undefined|| username === undefined || clave === undefined ||
        !nombre || !email || !username || !clave ){
            return res.status(CODES_HTTP.BAD_REQUEST).json({
                success: false,
                message: "Campos obligatorios sin llenar"
            })
        }

    next();
}

export const verificarLongitud_id = ( req: Request, res: Response, next: NextFunction ) => {
    const _id = req.params;
    const message = "ID incorrecto";
    const keys = Object.keys(_id);

    for( let key of keys ){
        for( let param of listParams ){
            
            if( key == param ){
                
                if(_id[key].length < 24 || _id[key].length > 24) return res.status(CODES_HTTP.BAD_REQUEST).json({
                    success: false,
                    message
                })
            }
    
        }

    }
    
    next();
}