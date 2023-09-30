import { IDevices } from "@Interfaces/devices.interface";
import { Schema, model, Types } from "mongoose";

const devicesSchema = new Schema({
    idUsuario: Types.ObjectId,
    token: String,
    estado: String,
    activa: Boolean,
    dispositivo: String,
    navegador: String,
    ipv4: String,
    ubicacion: String,
    plataform: String
},{
    timestamps: true
});

export default model<IDevices>('Devices', devicesSchema);