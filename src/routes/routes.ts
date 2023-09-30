import { Router } from "express";
import authRoutes from "./auth.routes";


class Routes {
    public router: Router = Router();

    constructor(){
        this.config();
    }

    config(): void{
        this.router.use('/auth', authRoutes);
    }
}

const routes = new Routes();
export default routes.router;