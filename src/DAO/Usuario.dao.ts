import User from '@Models/Usuario';
import { IUser, IUserOptional } from "@Interfaces/usuario.interface";

class UsuarioDAO{

    async getAll(){
        return new Promise( (resolve, reject) => User
            .find( {}, { clave: 0 } )
            .populate("roles")
            .exec( (err, docs) => {
                if(err) return reject(err);
                return resolve(docs);
            })
        )
    }

    async getAllUsersRolUsuario( rolID: string ){
        return new Promise( (resolve, reject) => User
            .find( { roles: rolID }, { clave: 0 } )
            .populate("roles")
            .exec( (err, docs) => {
                if(err) return reject(err);
                return resolve(docs);
            })
        )
    }

    async getUserByEmail( email: string ): Promise<IUser>{
        return new Promise( ( resolve, reject ) => User
            .findOne( { email } ).exec( ( err, docs ) => {
                if( err ) return reject(err);
                return resolve(docs!);
            } )
        )
    }

    async getOneById( id: string ): Promise<IUser>{
        return new Promise( (resolve, reject) => User
            .findById( id )
            .populate("roles")
            .exec( (err, docs) => {
                if(err) return reject(err);
                return resolve(docs!);
            })
        )
    }

    async create( data: Object ): Promise<IUser>{
        return new Promise( async (resolve, reject) => {
            const createUser = new User(data)
            await createUser.save({}, (err,docs) => {
                if(err) return reject(err);
                return resolve(docs);
            });
        })
    }

    async updateData( id: string, updateData: IUserOptional ): Promise<IUser>{
        return new Promise( (resolve, reject) => User
            .findByIdAndUpdate(
                id,
                updateData,
                {
                    new: true
                },
                ( err, docs ) => {
                    if( err ) return reject(err);
                    return resolve(docs!);
                }
            )
        )
    }

    async deleteAccount(id: string){
        return new Promise( (resolve, reject) => User
            .findByIdAndDelete( id )
            .exec( (err, docs) => {
                if(err) return reject(err);
                return resolve(docs);
            })
        )
    }

}

export const usuarioDao = new UsuarioDAO();