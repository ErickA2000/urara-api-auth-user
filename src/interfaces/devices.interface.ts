import { Document } from "mongoose"

export interface IDevices extends Document{
    idUsuario: string,
    token: string,
    estado: string,
    activa: boolean
    dispositivo: String,
    navegador: string,
    ipv4: string,
    ubicacion: string,
    plataform: string
}