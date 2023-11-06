import { connectDB, disconnectDB } from "../../src/database";
import { encryptAndDecryptData } from "../../src/util/encryptAndDecryptData";
import { newUser, user, userAdmin } from '../constanst';
import { post } from "../helpers/petitions";
import type { Response } from 'superagent';

const baseUrl = "/v1/api/auth";

//Encriptar datos de nuevo usuario
// let reqEncrypt = {
//     reqEncrypt: ""
// };
const failReqEncrypt = {
    reqEncryp: ""
}


describe( "Test auth routes", () => {

    beforeAll( () => {
        connectDB();
    })

    afterAll( () => {
        disconnectDB();
    })

    // POST register
    describe( "POST register", () => {
        const url = `${baseUrl}/registro`;

        describe("SUCCESS REQUEST", () => {

            let response: Response;

            it( "should respond with 200 status code", async () => {

                const reqEncrypt = encrypt(newUser);
                response = await post(url, reqEncrypt);

                expect(response.statusCode).toBe(200);

            } );

            it("should respond with object", () => {
                expect(response.body).toBeInstanceOf(Object);
            });

            it("should respond with a property <success> in true", () => {
                expect(response.body.success).toBe(true)
            });


        });

        describe("FAIL REQUEST", () => {
            it("should respond with 500 status code when decrypt fails",async () => {
                const response = await post(url, failReqEncrypt);
                expect(response.status).toBe(500)
            });

            it("should respond with a property <message> 'El usuario ya existe'",async () => {
               newUser.username = "general";
               const reqEncrypt = encrypt( newUser );
               const response = await post(url, reqEncrypt);
               expect(response.body.message).toBe('El usuario ya existe');
            });

            it("should respond with a property <message> 'El email ya existe'",async () => {
               newUser.username = `user_test${ Math.random() }`;
               newUser.email = "general@gmail.com";
               const reqEncrypt = encrypt( newUser );
               const response = await post(url, reqEncrypt);
               expect(response.body.message).toBe('El email ya existe');     
            });

            it("should respond with a property <message> 'Campos obligatorios sin llenar'",async () => {
               newUser.email = "";
               const reqEncrypt = encrypt( newUser );
               const response = await post(url, reqEncrypt);
               expect(response.body.message).toBe('Campos obligatorios sin llenar') 
            });
        });

    } )


    //POST login catalogo web

    describe( "POST login web principal", ()=> {
        const url = `${baseUrl}/login`;

        describe("SUCCESS REQUEST", () => {

            let response: Response;

            it( "should respond with 200 status code", async () => {

                const reqEncrypt = encrypt(user.good);
                response = await post(url, reqEncrypt);
                expect(response.statusCode).toBe(200);

            } );

            it("should respond with object", () => {
                expect(response.body).toBeInstanceOf(Object);
            });

            it("should respond with a property <success> in true", () => {
                expect(response.body.success).toBe(true)
            });


        });

        describe("FAIL REQUEST", () => {

            
            it("should respond with 500 status code when decrypt fails",async () => {
                const response = await post(url, failReqEncrypt);
                expect(response.status).toBe(500)
            });
            
            
            it("should respond with a property <message> 'El usuario no existe'",async () => {
                
               const reqEncrypt = encrypt(user.noExistent);
               const response = await post(url, reqEncrypt);
               expect(response.body.message).toBe('El usuario no existe');
            });

            it("should respond with a property <message> 'No se a verificado el email'",async () => {
               
               const reqEncrypt = encrypt(user.noVerify)
               const response = await post(url, reqEncrypt);
               expect(response.statusCode).toBe(401);
               expect(response.body.message).toBe('No se a verificado el email');     
            });

            it("should respond with a property <message> 'Contraseña incorrecta'",async () => {
               
               const reqEncrypt = encrypt( user.wrongPass );
               const response = await post(url, reqEncrypt);
               expect(response.body.message).toBe('Contraseña incorrecta') 
            });

            it("should respond with a property <message> 'Acceso no permitido' when role is admin or moderator", async() => {

                const reqEncrypt = encrypt(userAdmin.good);
                const response = await post(url, reqEncrypt);
                expect(response.body.message).toBe('Acceso no permitido');

            });
        });
    });


    //POST login panel administrador
    describe( "POST login panel administrador", ()=> {
        const url = `${baseUrl}/loginPanel`;

        describe("SUCCESS REQUEST", () => {

            let response: Response;

            it( "should respond with 200 status code", async () => {

                const reqEncrypt = encrypt(userAdmin.good);
                response = await post(url, reqEncrypt);
                expect(response.statusCode).toBe(200);

            } );

            it("should respond with object", () => {
                expect(response.body).toBeInstanceOf(Object);
            });

            it("should respond with a property <success> in true", () => {
                expect(response.body.success).toBe(true)
            });


        });

        describe("FAIL REQUEST", () => {

            
            it("should respond with 500 status code when decrypt fails",async () => {
                const response = await post(url, failReqEncrypt);
                expect(response.status).toBe(500)
            });
            
            
            it("should respond with a property <message> 'El usuario no existe'",async () => {
                
               const reqEncrypt = encrypt(userAdmin.noExistent);
               const response = await post(url, reqEncrypt);
               expect(response.body.message).toBe('El usuario no existe');
            });

            it("should respond with a property <message> 'No se a verificado el email'",async () => {
               
               const reqEncrypt = encrypt(userAdmin.noVerify)
               const response = await post(url, reqEncrypt);
               expect(response.statusCode).toBe(401);
               expect(response.body.message).toBe('No se a verificado el email');     
            });

            it("should respond with a property <message> 'Contraseña incorrecta'",async () => {
               
               const reqEncrypt = encrypt( userAdmin.wrongPass );
               const response = await post(url, reqEncrypt);
               expect(response.body.message).toBe('Contraseña incorrecta') 
            });

            it("should respond with a property <message> 'Acceso no permitido' when role is user", async() => {

                const reqEncrypt = encrypt(user.good);
                const response = await post(url, reqEncrypt);
                expect(response.body.message).toBe('Acceso no permitido');

            });
        });
    });

    //POST reset password
    describe("POST reset password", () => {

        const url = `${baseUrl}/restablecerClave`;

        describe("REQUEST SUCCESS", () => {
            let response: Response;

            it("should respond with 200 status code", async () => {
                const reqEncrypt = encrypt({ email: "failemail0.17879788448157896@gmail.com" });
                response = await post(url, reqEncrypt);
                expect(response.statusCode).toBe(200)
            });

            it("should respond with object", () => {
                expect(response.body).toBeInstanceOf(Object);
            });

            it("should respond with a property <success> in true", () => {
                expect(response.body.success).toBe(true)
            });
        });

        describe("FAIL REQUEST", () => {
            it("should respond with 500 status code when decrypt fails",async () => {
                const response = await post(url, failReqEncrypt);
                expect(response.status).toBe(500)
            });
            
            
            it("should respond with a property <message> 'Se requiere el email'",async () => {
                
               const reqEncrypt = encrypt({ });
               const response = await post(url, reqEncrypt);
               expect(response.body.message).toBe('Se requiere el email');
            });

            it("should respond with a property <message> 'No se encontro el email'",async () => {
               
               const reqEncrypt = encrypt( { email: 'failemail0.58477846557933@gmail.com' } );
               const response = await post(url, reqEncrypt);
               expect(response.body.message).toBe('No se encontro el email') 
            });

            it("should respond with a property <message> 'No se a verificado el email'",async () => {
               
               const reqEncrypt = encrypt({ email: 'failemail0.5847784655793311@gmail.com' });
               const response = await post(url, reqEncrypt);
               expect(response.statusCode).toBe(401);
               expect(response.body.message).toBe('No se a verificado el email');     
            });

        })
    });

    

} )


function encrypt( data: Object ){
    const encrypt = encryptAndDecryptData.encrypt(data);
    return {
        reqEncrypt: encrypt
    }
}