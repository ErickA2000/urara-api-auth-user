import { Router } from "express";
// import { cleanRequest, readRequest, validacion } from "@Middlewares/index"

import { authController } from "@Controllers/auth.controller";

class AuthRoutes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
    //    this.router.post('/registro', [ readRequest.decryptRequest, cleanRequest.cleanAuthAndUser, validacion.verificarExisteUsernameOemail,
    //     validacion.verificarCamposObligatoriosRegistroUsuario ], authController.registrar)
    //    this.router.post('/login',[ readRequest.decryptRequest, cleanRequest.cleanAuthAndUser ], authController.login)
    //    this.router.post('/loginPanel',[ readRequest.decryptRequest, cleanRequest.cleanAuthAndUser ], authController.loginPanel)
    //    this.router.post('/verify/:username', authController.verify2fa);
    //    this.router.get('/resend-code/:username', authController.resendCode);

    //    this.router.post('/restablecerClave', [ readRequest.decryptRequest, cleanRequest.cleanAuthAndUser ], authController.restablecerClave )
    //    this.router.get('/confirm/:token', authController.confirmAccount)

        this.router.get('/login', authController.test);
    }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;