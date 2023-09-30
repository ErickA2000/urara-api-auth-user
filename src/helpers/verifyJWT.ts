import jwt from 'jsonwebtoken';
import { IPayload } from "@Interfaces/auth.interfaces";
import { IResturns } from '@Interfaces/globals.interfaces';

const showDataLog = require("../util/logger/logger")

const verifyJWT = ( token: string ): IResturns => {
    try {
        const payload = jwt.verify(token, process.env.TOKEN_SECRET || 'tokentesturaraapi') as IPayload;
        return {
            success: true,
            message: payload._id
        }
    } catch (error) {
        showDataLog.warn({ message: `Confirmar Cuenta | ERROR!! Token invalido` });
        return {
            success: false,
            message: "Token Invalido"
        }
    }
}

export default verifyJWT;