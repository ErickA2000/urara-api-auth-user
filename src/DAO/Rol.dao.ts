import { IRol, OptionsFind } from "@Interfaces/rol.interface";
import Roles from "@Models/Roles";

class RolDAO {

    async getAll(){
        return new Promise( (resolve, reject) => Roles
            .find()
            .exec( (err, docs) => {
                if(err) return reject(err);
                return resolve(docs);
            } )
        )
    }

    async getFind( roles: string, options: OptionsFind ): Promise<IRol[]>{
        return new Promise( (resolve, reject) => {
            
            if( options.findBy == "id" ){
                Roles
                .find({ _id: {$in: roles} })
                .exec( (err, docs) => {
                    if(err) return reject(err);
                    return resolve(docs)
                })
            }

            if( options.findBy == "nombre" ){
                Roles
                .find({ nombre: {$in: roles} })
                .exec( (err, docs) => {
                    if(err) return reject(err);
                    return resolve(docs)
                })
            }
            }
        )
    }

    async getOne( nameRol: string ): Promise<IRol>{
        return new Promise( (resolve, reject) => Roles
            .findOne({ nombre: nameRol })
            .exec( (err,docs) => {
                if(err) return reject(err);
                return resolve(docs!);
            })
        )
    }

    async create( rol: Object ): Promise<IRol>{
        return new Promise( async (resolve, reject) => {
            const createRol = new Roles(rol);
            await createRol.save({}, (err, docs) => {
                if(err) return reject(err);
                return resolve(docs);
            })
        })
    }

    async update( rolID: string, data: Object ): Promise<IRol>{
        return new Promise( (resolve, reject) => Roles
            .findByIdAndUpdate(
                rolID, data,
                {
                    new: true
                },
                (err, docs) => {
                    if(err) return reject(err);
                    return resolve(docs!);
                }
            )
        )
    }

    async delete( rolID: string ){
        return new Promise( (resolve, reject) => Roles
            .findByIdAndDelete( rolID )
            .exec( (err, docs) => {
                if(err) return reject(err);
                return resolve(docs)
            })
        )
    }

}

export const rolDAO = new RolDAO();