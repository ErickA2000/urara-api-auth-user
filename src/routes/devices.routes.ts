import { Router } from "express";
import { autenticacion, cleanRequest, readRequest, validacion } from "@Middlewares/index";
import { devicesController } from "@Controllers/device.controller";

class DevicesRoutes{
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.get('/', [ autenticacion.TokenValidation, autenticacion.isAdmin ], devicesController.getAllDevices);
        this.router.get('/user',[ autenticacion.TokenValidation ], devicesController.getDevicesByUser);
        this.router.get('/verify', devicesController.verifyTokenDevices);
        this.router.get('/this', [ autenticacion.TokenValidation ], devicesController.getThisDevice);
        this.router.post('/add', [ autenticacion.TokenValidation, readRequest.decryptRequest, cleanRequest.cleanDevice ], devicesController.addNewDevice);
        this.router.put('/update/:deviceId', [ autenticacion.TokenValidation, validacion.verificarLongitud_id, readRequest.decryptRequest, cleanRequest.cleanDevice ], devicesController.updateDevice);
    }
}
const devicesRoutes = new DevicesRoutes();
export default devicesRoutes.router;