import { Request, Response, NextFunction } from 'express';

function clean( typeData: string[], req: Request ){
    const keys = Object.keys(req.body);
    const clean: any = {};
    
    for( let key of keys ){
        for( let nameProperti of typeData ){
            if( key === nameProperti ){
                clean[key] = req.body[key];
            }
        }
    }

    return clean;
}

export const cleanAuthAndUser = ( req: Request, res: Response, next: NextFunction ) => {
    
    const typeDataAuth = [ "nombre", "telefono", "email", "username", "clave", "roles", "verify2fa", "direcciones" ];

    const cleanAuth = clean( typeDataAuth, req );

    req.body = cleanAuth;
    
    next();
}

export const cleanDevice = ( req: Request, res: Response, next: NextFunction ) => {
    
    const typeDataDevice = [ "idUsuario", "token", "estado", "activa", "dispositivo", "navegador", 
        "ipv4", "ubicacion", "plataform" ];

    const cleanDevice = clean(typeDataDevice, req);

    req.body = cleanDevice;

    next();
}