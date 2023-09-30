import { Request, Response } from "express";

// import { encryptAndDecryptData } from "@Utils/encryptAndDecryptData";
// import { generarClave } from "@Utils/functions";
// import User from "@Models/Usuario"
// import { IUser } from "@Interfaces/usuario.interface";
// import { authDAO } from "@DAO/Auth.dao";
// import { Credenciales, CredencialesRegistro } from "@Interfaces/auth.interfaces";
// import { usuarioDao } from "@DAO/Usuario.dao";
// import sendEmail from "@Helpers/sendEmail";
// import verifyJWT from "@Helpers/verifyJWT";
// import generateToken from "@Helpers/generateJWT";
// import { rolDAO } from "@DAO/Rol.dao";
// import { CODES_HTTP, REGEXP } from "@Constants/global";
// import generateCode from "@Helpers/generateCode";

// const showDataLog = require("../util/logger/logger")

class AuthController {

    public async test( req: Request, res: Response ){
        res.json({
            success: true,
            message: "test auth"
        })
    }

    // public async registrar(req: Request, res: Response) {
    //     let credenciales: CredencialesRegistro = req.body;        
    //     const { username, clave } = credenciales;
        
    //     // agregar rol
    //     const role = await rolDAO.getOne( "usuario" );
        
    //     credenciales.roles = [role!._id];
    //     credenciales.clave = await User.encryptClave(clave);
    //     credenciales.verify2fa = {
    //         estado: false,
    //         metodos: [{
    //             tipo: "email",
    //             estado: false
    //         }],
    //         code_access: ""
    //     }
        
    //     //Se guarda un nuevo usuario
    //     const savedUser = await authDAO.registrar(credenciales);
        
    //     //enviar email de verificacion
    //     const body = "<p>Confirma la creacion de tu cuenta. Tiene 1 hora para poder confirmar.";
    //     const sendMail = await sendEmail( savedUser.email, "Confirmación cuenta URARA", body, { generateToken: true } );
        
    //     if( sendMail.success === false ){
    //         return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
    //             success: false,
    //             message:  'Error al enviar Email ->'+ sendMail.message
    //         })
    //     }

    //     showDataLog.info({ message: `Usuario registrado sin confirmar email-> ${username}` })
    //     res.status(CODES_HTTP.OK).json({ 
    //         success: true, 
    //         message: "Usuario registrado, verifica el email" 
    //     })
    // }

    // public async login(req: Request, res: Response) {
    //     let credenciales: Credenciales = req.body;        

    //     try {
    //         let user!: IUser

    //         if( REGEXP.email.test(credenciales.username) ){
    //             user = await usuarioDao.getUserByEmail(credenciales.username);
    //         }else{

    //             user = await authDAO.getUserByUsername( credenciales.username ) as IUser;
    //         }

    //         //Comprobar existe usuario
    //         if (!user) {
    //             showDataLog.warn({ message: `Login usuario | No existe el usuario -> ${credenciales.username}` })
    //             return res.status(CODES_HTTP.BAD_REQUEST).json({ 
    //                 success: false, 
    //                 message: "El usuario no existe" });
    //         }
    
    //         //Comprobar verificacion de la cuenta
    //         if(user.emailverified == false){
    //             showDataLog.warn({ message: `Login usuario | email no verificado -> ${user.email}` });
    //             return res.status(CODES_HTTP.UNAUTHORIZED).json({
    //                 success: false,
    //                 message: 'No se a verificado el email'
    //             });
    //         } 
    
    //         //Comprobar clave
    //         const validarClave = await User.compareClave(credenciales.clave, user.clave);
    
    //         if (!validarClave) {
    //             showDataLog.warn({ message: `Login usuario | Contraseña incorrecta - user -> ${credenciales.username}` })
    //             return res.status(CODES_HTTP.UNAUTHORIZED).json({ 
    //                 success: false, 
    //                 message: "Contraseña incorrecta" 
    //             });
    //         }
    
            
    //         //Verificar rol de usuario
    //         const foundRoles = await rolDAO.getFind( user.roles, { findBy: "id" } );
    //         const userRoles = foundRoles.map((roles) => roles.nombre);
            
    //         if (userRoles.includes("admin") || userRoles.includes("moderador")) {
    //             showDataLog.warn({ message: `Login usuario | Acceso no permitido - user -> ${credenciales.username}` });
    //             return res.status(CODES_HTTP.UNAUTHORIZED).json({
    //                 success: false,
    //                 message: "Acceso no permitido"
    //             })
    //         }

    //         //verificacion en dos pasos
    //         if( user.verify2fa.estado ){
    //             const code = generateCode( 6 );

    //             for( let metodo of user.verify2fa.metodos ){
    //                 if(  metodo.tipo === "email" && metodo.estado ){
    //                     user.verify2fa.code_access = code;
    //                 }
    //             }
    //             await user.save();

    //             //Enviar email con codigo
    //             const body = `<p>Código de verificación: ${code}</p>`;
    //             const sendMail = await sendEmail( user.email, "Verificación en dos pasos - URARA", body);

    //             if( sendMail.success === false ){
    //                 return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
    //                     success: false,
    //                     message:  'Error al enviar Email ->'+ sendMail.message
    //                 })
    //             }

    //             return res.status(CODES_HTTP.OK).json({
    //                 success: true,
    //                 message: "verification_in_process"
    //             })
    //         }
            
    //         //Generando token
    //         const token: string = generateToken( user._id, 48 );
    
    //         // Encriptar data user
    //         let dataUserEncript: string;
    //         try {
    //             dataUserEncript = encryptAndDecryptData.encrypt( user );
    //         } catch (error) {
    //             showDataLog.warn({ message: `Login panel - encriptando data user | ERROR!! Posible llave de desencriptado erronea` })
    //             return res.status(CODES_HTTP.BAD_REQUEST).json({
    //                 success: false,
    //                 message: "A ocurrido un error"
    //             })
    //         }
    
    //         showDataLog.info({ message: `Login usuario | Inicio sesion - user -> ${credenciales.username}` });
    //         res.status(CODES_HTTP.OK).header('token', token).json({ 
    //             success: true,
    //             message: "Inicio sesion",
    //             data: dataUserEncript
    //         });
    //     } catch (error) {
    //         return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
    //             success: false,
    //             message: error
    //         })
    //     }
    // }

    // public async loginPanel(req: Request, res: Response) {
    //     let credenciales: Credenciales = req.body;   

    //     try {
    //         let user!: IUser;

    //         //comprobar si se ingreso email o usuario
    //         if( REGEXP.email.test(credenciales.username) ){
    //             user = await usuarioDao.getUserByEmail( credenciales.username );
    //         }else{
    //             user = await authDAO.getUserByUsername( credenciales.username ) as IUser;
    //         }
    
    //         //Comprobar existe usuario
    //         if (!user) {
    //             showDataLog.warn({ message: `Login panel | No existe el usuario -> ${credenciales.username}` });
    //             return res.status(CODES_HTTP.BAD_REQUEST).json({ success: false, message: "El usuario no existe" });
    //         }
    
    //         //Comprobar verificacion email
    //         if(user.emailverified == false){
    //             showDataLog.warn({ message: `Login panel | email no verificado -> ${user.email}` });
    //             return res.status(CODES_HTTP.UNAUTHORIZED).json({
    //                 success: false,
    //                 message: 'No se a verificado el email'
    //             });
    //         } 
    
    //         //Comprobar clave
    //         const validarClave = await User.compareClave(credenciales.clave, user.clave);
    
    //         if (!validarClave) {
    //             showDataLog.warn({ message: `Login panel | Contraseña incorrecta - user --> ${credenciales.username}` })
    //             return res.status(CODES_HTTP.UNAUTHORIZED).json({ success: false, message: "Contraseña incorrecta" });
    //         }
    
            
    //         //Verificar rol de usuario
    //         const foundRoles = await rolDAO.getFind( user.roles, { findBy: "id" } );
    //         const userRoles = foundRoles.map((roles) => roles.nombre);
            
    //         if (userRoles.includes("usuario")) {
    //             showDataLog.warn({ message: `Login panel | Acceso no permitido - user --> ${credenciales.username}` })
    //             return res.status(CODES_HTTP.UNAUTHORIZED).json({
    //                 success: false,
    //                 message: "Acceso no permitido"
    //             })
    //         }

    //         //verificacion en dos pasos
    //         if( user.verify2fa.estado ){
    //             const code = generateCode( 6 );

    //             for( let metodo of user.verify2fa.metodos ){
    //                 if( metodo.tipo === "email" && metodo.estado ){
    //                     user.verify2fa.code_access = code;
    //                 }
    //             }

    //             await user.save();

    //             //Enviar email con codigo
    //             const body = `<p>Código de verificación: ${code}</p>`;
    //             const sendMail = await sendEmail( user.email, "Verificación en dos pasos - URARA", body );

    //             if( sendMail.success === false ){
    //                 return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
    //                     success: false,
    //                     message:  'Error al enviar Email ->'+ sendMail.message
    //                 })
    //             }

    //             return res.status(CODES_HTTP.OK).json({
    //                 success: true,
    //                 message: "verification_in_process"
    //             });
    //         }
            
    //         //Generando token
    //         const token: string = generateToken( user._id, 48 );
    
    //         //encriptando datos de usuario
    //         let dataUserEncript: string;
    //         try {
    //             dataUserEncript = encryptAndDecryptData.encrypt( user );
    //         } catch (error) {
    //             showDataLog.warn({ message: `Login panel - encriptando data user | ERROR!! Posible llave de desencriptado erronea` })
    //             return res.status(CODES_HTTP.BAD_REQUEST).json({
    //                 success: false,
    //                 message: "A ocurrido un error"
    //             })
    //         }
            
    //         showDataLog.info({ message: `Login panel | Inicio sesion - user --> ${credenciales.username} ` })
    //         res.status(CODES_HTTP.OK).header('token', token).json({ 
    //             success: true, 
    //             message: "Inicio sesion",
    //             data: dataUserEncript,
    //         });
            
    //     } catch (error) {
    //         return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
    //             success: false,
    //             message: error
    //         })
    //     }
    // }

    // public async restablecerClave(req: Request, res: Response) {
    //     const { email } = req.body;

    //     if (!email) return res.status(CODES_HTTP.BAD_REQUEST).json({
    //         success: false,
    //         message: 'Se requiere el email'
    //     })

    //     try {

    //         //Consultar si se encuentra el email 
    //         const user = await usuarioDao.getUserByEmail( email ) as IUser;
    //         if (!user) return res.status(CODES_HTTP.FORBIDDEN).json({
    //             success: false,
    //             message: 'No se encontro el email'
    //         });

    //         if(user.emailverified == false) return res.status(CODES_HTTP.UNAUTHORIZED).json({
    //             success: false,
    //             message: 'No se a verificado el email'
    //         });

    //         let newPass = user;

    //         //Generar contraseña            
    //         const claveGenerada = generarClave(7);
    //         const clave: string = await User.encryptClave(claveGenerada);
    //         newPass.clave = clave;

    //         //Guardar clave generada en la base de datos
    //         await usuarioDao.updateData( user._id, newPass );

    //         //Enviar correo con contraseña
    //         const bodyEmail = `<p>Se a generado una nueva clave</p>
    //             <p>Clave: ${claveGenerada}</p>
    //             <p>Se recomienda actualizar la clave cuando ingrese</p>`;

    //         const resSendEmail = await sendEmail( user.email, "Restablecer Clave - URARA", bodyEmail );
    //         if( resSendEmail.success === false ){
    //             throw new Error( 'Error al enviar Email ->'+ resSendEmail.message );
    //         }
    //         res.status(CODES_HTTP.OK).json({
    //             success: true,
    //             message: 'Solicitud enviada, revice su email.'
    //         })
            

    //     } catch (error) {
    //         console.error(error);
    //         showDataLog.warn({ message: `Restablecer clave | ERROR!! ${error}` });
    //         res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
    //             success: false,
    //             message: `Ha ocurrido un error: ${error}`
    //         })
    //     }
    // }

    // public async confirmAccount(req: Request, res: Response) {

    //     const confirmAccount = async (token: string) => {
    //         const resVerify = verifyJWT(token);
            
    //         if( resVerify.success === false ){
    //             const err = resVerify.message as string;
    //             throw new Error(err)
    //         }

    //         return await usuarioDao.getUserByEmail( resVerify.message as string )
    //             .then(async user => {
    //                 if (!user) throw new Error('No se a encontrado el usuario')

    //                 if (user.emailverified == true) throw new Error('El usuario ya esta verificado')

    //                 user.emailverified = true;
                    
    //                 return await usuarioDao.updateData( user._id, user );
    //             })


    //     }

    //     try {
    //         confirmAccount(req.params.token)
    //             .then(() => {
    //                 res.status(CODES_HTTP.OK).json({
    //                     success: true,
    //                     message: "Confirmado el usuario exitosamente"
    //                 })
    //             }).catch(err => {
    //                 res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
    //                     success: false,
    //                     message: err.message
    //                 })
    //             })
    //     } catch (err) {
    //         res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
    //             success: false,
    //             message: err
    //         })
    //     }



    // }

    // public async verify2fa( req: Request, res: Response ){
    //     const { username } = req.params;
    //     const { code } = req.body;

    //     try {
    //         let user!: IUser;

    //         if( REGEXP.email.test(username) ) {
    //             user = await usuarioDao.getUserByEmail( username );
    //         }else{
    //             user = await authDAO.getUserByUsername( username );
    //         }

    //         if( !user ) return res.status(CODES_HTTP.UNAUTHORIZED).json({
    //             success: false,
    //             message: "El usuario no existe"
    //         });

    //         if( code != user.verify2fa.code_access ) return res.status(CODES_HTTP.UNAUTHORIZED).json({
    //             success: false,
    //             message: "Codigo invalido"
    //         });

    //         //generar token
    //         const token: string = generateToken( user._id, 48 ); 

    //         //Encriptando data de usuario
    //         let dataUserEncript = encryptAndDecryptData.encrypt( user );

    //         //Eliminando codigo de acceso
    //         user.verify2fa.code_access = "";
    //         await user.save();

    //         showDataLog.info({ message: `Login usuario | Inicio sesion - user -> ${user.username}` });
    //         res.status(CODES_HTTP.OK).header('token', token).json({
    //             success: true,
    //             message: "Inicio sesión correcto",
    //             data: dataUserEncript
    //         });

    //     } catch (error) {
    //         return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
    //             success: false,
    //             message: error
    //         })
    //     }
    // }

    // public async resendCode( req: Request, res: Response ){
    //     const { username } = req.params;

    //     try {
    //         let user!: IUser;

    //         if( REGEXP.email.test( username ) ) {
    //             user = await usuarioDao.getUserByEmail( username );
    //         }else{
    //             user = await authDAO.getUserByUsername( username );
    //         }

    //         //verificacion en dos pasos
    //         if( user.verify2fa.estado ) {
    //             const code = generateCode( 6 );

    //             for( let metodo of user.verify2fa.metodos ){
    //                 if( metodo.tipo === "email" && metodo.estado ){
    //                     user.verify2fa.code_access = code;
    //                 }
    //             }

    //             await user.save();

    //             //Enviar email con codigo
    //             const body = `<p>Código de verificación: ${code}</p>`;
    //             const sendMail = await sendEmail( user.email, "Verificación en dos pasos - URARA", body );

    //             if( sendMail.success === false ){
    //                 return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
    //                     success: false,
    //                     message:  'Error al enviar Email ->'+ sendMail.message
    //                 })
    //             }
    //         }

    //         res.status(CODES_HTTP.OK).json({
    //             success: true,
    //             message: "verification_in_process"
    //         });


    //     } catch (error) {
    //         return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
    //             success: false,
    //             message: error
    //         })
    //     }
    // }

}

export const authController = new AuthController();