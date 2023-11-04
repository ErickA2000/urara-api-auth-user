import { connectDB, disconnectDB } from "../../src/database";
import { encryptAndDecryptData } from "../../src/util/encryptAndDecryptData";
import { newUser } from '../constanst';
import { post } from "../helpers/petitions";

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

    // beforeAll( () => {
    //     connectDB();
    // })

    afterAll( () => {
        disconnectDB();
    })

    describe( "POST register", () => {
        const url = `${baseUrl}/registro`;

        describe("SUCCESS REQUEST", () => {

            it( "should respond with 200 status code", async () => {
                const response = await post(url, reqEncrypt);

                expect(response.statusCode).toBe(200);
            } )

        })

    } )

} )


function encrypt( data: Object ){
    reqEncrypt.reqEncrypt = encryptAndDecryptData.encrypt(data);
}