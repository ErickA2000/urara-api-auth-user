import { Router } from "express";
import authRoutes from "./auth.routes";
import devicesRoutes from "./devices.routes";
import usuarioRoutes from "./usuario.routes";


class Routes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.use('/auth', authRoutes);
        this.router.use('/devices', devicesRoutes);
        this.router.use('/users', usuarioRoutes);
    }
}

const routes = new Routes();
export default routes.router;