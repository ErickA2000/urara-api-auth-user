import { connectDB, disconnectDB } from "../../src/database";
import { encryptAndDecryptData } from "../../src/util/encryptAndDecryptData";
import { newUser } from '../constanst';
import { post } from "../helpers/petitions";
import type { Response } from 'superagent';

const baseUrl = "/v1/api/auth";

//Encriptar datos de nuevo usuario
let reqEncrypt = {
    reqEncrypt: ""
};
const failReqEncrypt = {
    reqEncryp: ""
}

encrypt(newUser);

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
            it("should respond with 400 status code when decrypt fails",async () => {
                const response = await post(url, failReqEncrypt);
                expect(response.status).toBe(500)
            });

            it("should respond with a property <message> 'El usuario ya existe'",async () => {
               newUser.username = "general";
               encrypt( newUser );
               const response = await post(url, reqEncrypt);
               expect(response.body.message).toBe('El usuario ya existe');
            });

            it("should respond with a property <message> 'El email ya existe'",async () => {
               newUser.username = `user_test${ Math.random() }`;
               newUser.email = "general@gmail.com";
               encrypt( newUser );
               const response = await post(url, reqEncrypt);
               expect(response.body.message).toBe('El email ya existe');     
            });

            it("should respond with a property <message> 'Campos obligatorios sin llenar'",async () => {
               newUser.email = "";
               encrypt( newUser );
               const response = await post(url, reqEncrypt);
               expect(response.body.message).toBe('Campos obligatorios sin llenar') 
            });
        });

    } )


    //POST login catalogo web

    describe( "POST login web principal", ()=> {
        const url = `${baseUrl}/login`;
    })

} )


function encrypt( data: Object ){
    reqEncrypt.reqEncrypt = encryptAndDecryptData.encrypt(data);
}