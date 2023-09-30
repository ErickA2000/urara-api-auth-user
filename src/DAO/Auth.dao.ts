import User from "@Models/Usuario";
import { CredencialesRegistro } from "@Interfaces/auth.interfaces";
import { IUser } from "@Interfaces/usuario.interface";

class AuthDAO {

    async registrar( data: CredencialesRegistro ): Promise<IUser>{
        return new Promise( async (resolve, reject) => {
            const registerUser = await new User(data);
            await registerUser.save({}, (err, docs) => {
                if(err) return reject(err);
                return resolve(docs);
            })
        })
    }

    async getUserByUsername( username: string ): Promise<IUser>{
        return new Promise( (resolve, reject) => User
            .findOne( { username } )
            .populate('roles')
            .exec( (err, docs) => {
                if( err ) return reject(err);
                return resolve(docs!);
            } ) 
        )
    }

}

export const authDAO = new AuthDAO();