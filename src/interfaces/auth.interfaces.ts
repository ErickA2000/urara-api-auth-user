import { Iphone, Iverify2fa } from "./usuario.interface";

export interface IPayload {
    _id: string;
    iat: number;
    exp: number;
}

export interface Credenciales{
    username: string;
    clave: string;
}

export interface CredencialesRegistro{
    nombre: string;
    telefono: Iphone;
    email: string;
    username: string;
    clave: string;
    roles: [string]
    verify2fa: Iverify2fa
}