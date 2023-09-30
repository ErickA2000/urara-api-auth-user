import { Router } from "express";
import { autenticacion, validacion, readRequest, cleanRequest } from "@Middlewares/index";
import { usuarioController } from '@Controllers/usuario.controller'

class UsuarioRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
       this.router.post('/create', 
       [ autenticacion.TokenValidation, autenticacion.isAdmin, readRequest.decryptRequest,
        validacion.verificarExisteRol, validacion.verificarExisteUsernameOemail, 
        validacion.verificarCamposObligatoriosRegistroUsuario, cleanRequest.cleanAuthAndUser],
        usuarioController.createUser)

        this.router.get('/users', [ autenticacion.TokenValidation, autenticacion.isAdmin ], 
            usuarioController.getUsers )

        this.router.get('/users-usuario', [ autenticacion.TokenValidation, autenticacion.isModerador ], usuarioController.getUsersRolUsuario)
        
        this.router.get('/perfil', [ autenticacion.TokenValidation ], usuarioController.perfil)

        this.router.put('/update', [ autenticacion.TokenValidation, readRequest.decryptRequest,
            validacion.verificarExisteUsernameOemail, cleanRequest.cleanAuthAndUser ],
            usuarioController.updatePerfil)
        
        this.router.put('/update-clave', [ autenticacion.TokenValidation, readRequest.decryptRequest, validacion.verificarExisteUsernameOemail ],
            usuarioController.updateClave)

        this.router.delete('/deleteUser', [ autenticacion.TokenValidation ], 
            usuarioController.deleteUser)
        
        this.router.delete('/deleteUserAdmi/:userId', [ autenticacion.TokenValidation, autenticacion.isAdmin, validacion.verificarLongitud_id ], 
            usuarioController.deleteUserAdmin)
    }
}

const usuarioRoutes = new UsuarioRoutes();
export default usuarioRoutes.router;