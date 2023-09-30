import Role from '@Models/Roles';
import User from '@Models/Usuario';

export const createRole = async () => {
    
    try{
        const count = await Role.estimatedDocumentCount();

        if ( count > 0 ) return;
        
        const values = await Promise.all([
            new Role({nombre: 'usuario'}).save(),
            new Role({nombre: 'admin'}).save(),
            new Role({nombre: 'moderador'}).save()
        ]);

    }catch ( error ){
        console.error(error)
    }
  
}

export const createAdm = async () => {
    try{
        const count = await User.estimatedDocumentCount();

        if( count > 0 ) return;

        const roles = ["admin"];
        const foundRoles = await Role.find({nombre: {$in: roles}});

        const rolUsuario = ["usuario"];
        const foundRolUsuario = await Role.find({nombre: {$in: rolUsuario}});

        const rolModerador = ["moderador"];
        const foundRolModerador = await Role.find({nombre: {$in: rolModerador}})
        
        const values = await Promise.all([
            new User({
                nombre: 'Admin',
                telefono: {
                    codigo_area: "+57",
                    numero: "3124567890"
                },
                email: 'admin@gmail.com',
                username: 'admin',
                emailverified: true,
                clave: await User.encryptClave('admin1234'),
                roles: foundRoles.map((role) => role._id ),
                verify2fa: {
                    estado: false,
                    metodos: [
                        {
                            tipo: "email",
                            estado: false
                        }
                    ],
                    code_access: ""
                }
            }).save(),
            new User({
                nombre: 'General',
                telefono: {
                    codigo_area: "+57",
                    numero: "3124567890"
                },
                email: 'general@gmail.com',
                username: 'general',
                emailverified: true,
                clave: await User.encryptClave('user1general52compra'),
                roles: foundRolUsuario.map((role) => role._id ),
                verify2fa: {
                    estado: false,
                    metodos: [
                        {
                            tipo: "email",
                            estado: false
                        }
                    ],
                    code_access: ""
                }
            }).save(),
            new User({
                nombre: 'ClienteWebApp',
                telefono: {
                    codigo_area: "+57",
                    numero: "3124567890"
                },
                email: 'clienteweb@gmail.com',
                username: 'ClienteWebApp',
                emailverified: true,
                clave: await User.encryptClave('cliente12web05app'),
                roles: foundRolModerador.map((role) => role._id ),
                verify2fa: {
                    estado: false,
                    metodos: [
                        {
                            tipo: "email",
                            estado: false
                        }
                    ],
                    code_access: ""
                }
            }).save()
        ]);

    }catch( error ){
        console.error(error)
    }
}
