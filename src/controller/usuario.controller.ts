import { Request, Response } from "express";

import User from "@Models/Usuario";
import { encryptAndDecryptData } from "@Utils/encryptAndDecryptData"
import { IUser } from "@Interfaces/usuario.interface";
import { usuarioDao } from "@DAO/Usuario.dao";
import sendEmail from "@Helpers/sendEmail";
import { rolDAO } from "@DAO/Rol.dao";
import { CODES_HTTP } from "@Constants/global";

const showUserLog = require('../util/logger/logger.usuario');

class UsuarioController{

    public async createUser( req: Request, res: Response ){
        const { nombre, clave, roles } = req.body;
        const newUser: IUser = req.body;

        if( roles === undefined || roles.length == 0 || !roles ){
            return res.status(CODES_HTTP.BAD_REQUEST).json({
                success: false,
                message: "Se requiere el rol"
            });
        }
        //hash clave
        newUser.clave = await User.encryptClave(clave);

        newUser.verify2fa = {
            estado: false,
            metodos: [
                {
                    tipo: "email",
                    estado: false
                }
            ],
            code_access: ""
        }

        // agregar rol
        if ( roles ) {
            const foundRoles = await rolDAO.getFind( roles, { findBy: "nombre" } );
            newUser.roles = foundRoles.map( (role) => role._id);
        }else{
            const role = await rolDAO.getOne( "usuario" );
            newUser.roles = [role!._id];
        }

        //Se guarda un nuevo usuario
        const savedUser = await usuarioDao.create( newUser );

        //enviar email verificacion
        const body = "<p>Confirma la creacion de tu cuenta. Tiene 1 hora para poder confirmar.";
        const sendMail = await sendEmail( savedUser.email, "Confirmación cuenta URARA", body, { generateToken: true } );

        if( sendMail.success === false){
            return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Error al enviar Email ->'+ sendMail.message
            })
        }

        showUserLog.info({ message: `Se creo el usuario ${nombre} - usuario lo creo -> ${req.userId}` })
        res.status(CODES_HTTP.OK).json({ success: true,
            message: "Usuario registrado, requiere confirmación"
        })
    }

    public async getUsers( req: Request, res: Response ){
        const users = await usuarioDao.getAll();

        let dataEncrypt: string;
        try{
            dataEncrypt = encryptAndDecryptData.encrypt( users );
        }catch(error){
            return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Error al encriptar data"
            })
        }

        res.status(CODES_HTTP.OK).json({
            success: true,
            data: dataEncrypt
        })
    }

    public async getUsersRolUsuario( req: Request, res: Response ){

        const rol = await rolDAO.getOne( "usuario" );

        const users = await usuarioDao.getAllUsersRolUsuario( rol?._id )

        let dataEncrypt: string;
        try{
            dataEncrypt = encryptAndDecryptData.encrypt( users );
        }catch(error){
            return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Error al encriptar data"
            })
        }

        res.status(CODES_HTTP.OK).json({
            success: true,
            data: dataEncrypt
        })
    }

    public async perfil( req: Request, res: Response ){
        const user = await usuarioDao.getOneById( req.userId );

        let dataUserEncript: string;
        try {
            dataUserEncript = encryptAndDecryptData.encrypt( user );
        } catch (error) {
            showUserLog.warn({ message: 'Perfil | Error encrypt data'})
            return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: 'Error encrypt data user'
            })
        }
        res.status(CODES_HTTP.OK).json({
            success: true,
            message: 'Informacion usuario',
            data: dataUserEncript
        })
    }

    public async updatePerfil( req: Request, res: Response ){

        let updateUser = req.body;

        const user = await usuarioDao.getOneById( req.userId );
        if( !user ) return res.status(CODES_HTTP.NO_FOUND).json({ 
            success: false,
            message: "El usuario no existe" 
        });

        //cuando se cambia el correo
        if( updateUser.email || updateUser.email != undefined  ){
            if( updateUser.email != user.email ){
                updateUser.emailverified = false;
                
                const body = "<p>Confirma la creacion de tu cuenta. Tiene 1 hora para poder confirmar.";
                const sendMail = await sendEmail( updateUser.email, "Confirmación cuenta URARA", body, { generateToken: true } );

                if( sendMail.success === false ){
                    return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
                        success: true,
                        message: 'Error al enviar Email ->'+ sendMail.message
                    })
                }

            }
        }

        //sobre verificacion en dos pasos
        if( updateUser.verify2fa ){
            if( updateUser.verify2fa.estado ){
                updateUser.verify2fa.fechaActivacion = new Date( Date.now() );  
            } 
        }

        const updatePerfil = await usuarioDao.updateData( req.userId, updateUser );
        
        try {
            const encrypt = encryptAndDecryptData.encrypt( updatePerfil );

            showUserLog.info({ message: `El usuario ${updatePerfil!.username} modifico sus datos - user -> ${req.userId}` })
            res.status(CODES_HTTP.OK).json({ 
                success: true,
                message: 'Si el email se cambio, verificar el correo en su bandeja de entrada',
                data: encrypt            
             })
        } catch (error) {
            return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "A ocurrio un error interno"
            });
        }

    }

    public async updateClave( req: Request, res: Response){

        let updateUserClave = req.body;

        const user = await usuarioDao.getOneById( req.userId );
        if( !user ) return res.status(CODES_HTTP.NO_FOUND).json({ 
            success: false,
            message: "El usuario no existe" 
        });

        if( updateUserClave.claveAntigua && updateUserClave.claveNueva ){
            const validarClaveAntigua = await User.compareClave( updateUserClave.claveAntigua, user.clave );
            if( !validarClaveAntigua ) return res.status(CODES_HTTP.UNAUTHORIZED).json( {
                success: false,
                message: "La clave actual no es correcta"
            } );
            
            updateUserClave.clave = await User.encryptClave(updateUserClave.claveNueva) 

            delete updateUserClave.claveAntigua
            delete updateUserClave.claveNueva
            
        }else{
            return res.status(CODES_HTTP.BAD_REQUEST).json({
                success: false,
                message: "No se proporciono los valores requeridos "
            })
        }

        const updateClave = await usuarioDao.updateData( req.userId, updateUserClave );
        showUserLog.info({ message: `El usuario ${updateClave!.username} modifico sus datos - user -> ${req.userId}` })
        res.status(CODES_HTTP.OK).json({ 
            success: true,
            message: 'Clave actualizada correctmente'            
         })
    }

    public async deleteUser( req: Request, res: Response ){
        await usuarioDao.deleteAccount( req.userId );
        showUserLog.info({ message: `Se elimino la cuenta` })
        res.status(CODES_HTTP.NO_CONTENT).json()
    }

    public async deleteUserAdmin( req: Request, res: Response ){
        await usuarioDao.deleteAccount( req.params.userId );
        showUserLog.info({ message: `Se elimino el usuario - user -> ${req.userId}` })
        res.status(CODES_HTTP.NO_CONTENT).json()
    }

}

export const usuarioController = new UsuarioController();