import { Request, Response, NextFunction } from 'express'

import { encryptAndDecryptData } from '@Utils/encryptAndDecryptData';
import { CODES_HTTP } from '@Constants/global';
import { getSocketProgress } from '@Utils/functions';

export const decryptRequest = ( req: Request, res: Response, next: NextFunction) => {
    const { reqEncrypt } = req.body;
    try{
        let data = encryptAndDecryptData.decrypt( reqEncrypt );
        req.body = data;
    }catch(error){
        return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "A ocurrido un error"
        })
    }    

    next()
}

export const calculateSizeRequest = ( req: Request, res: Response, next: NextFunction) => {
    console.log( getSocketProgress(req.socket) );
    next();
}