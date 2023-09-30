import Devices from "@Models/Devices";
import { IDevices } from "@Interfaces/devices.interface";

class DevicesDAO{

    async getAll(): Promise<IDevices[]>{
        return new Promise( (resolve, reject) => Devices
            .find()
            .exec( (err,docs) => {
                if(err) return reject(err);
                return resolve(docs)
            })
        )
    }

    async getByUser( userId: string ): Promise<IDevices[]>{
        return new Promise( (resolve, reject) => Devices
            .find( { idUsuario: userId } )
            .exec( (err, docs) => {
                if(err) return reject(err);
                return resolve(docs)
            })
        )
    }

    async getOneByToken( token: string ): Promise<IDevices | null>{
        return new Promise( (resolve, reject) => Devices
            .findOne( { token } )
            .exec( (err, docs) => {
                if(err) return reject(err);
                return resolve(docs); 
            })
        )
    }

    async getOneById( deviceId: string ): Promise<IDevices | null>{
        return new Promise( (resolve, reject) => Devices
            .findById( deviceId )
            .exec( (err, docs) => {
                if(err) return reject(err);
                return resolve(docs);
            })
        )
    }

    async add( data: Object ): Promise<IDevices>{
        return new Promise( async (resolve, reject) => {
            const addDevices = new Devices(data);
            await addDevices.save({}, ( err, docs ) => {
                if(err) return reject(err);
                return resolve(docs);
            })
        })
    }

    async update( deviceId: string, data: Object ): Promise<IDevices | null>{
        return new Promise( (resolve, reject) => Devices
            .findByIdAndUpdate( 
                deviceId, data,
                {
                    new: true
                },
                ( err, docs ) => {
                    if(err) return reject(err);
                    return resolve(docs)
                }
            )
        )
    }

}

export const devicesDAO = new DevicesDAO();