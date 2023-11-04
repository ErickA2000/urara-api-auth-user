import { encryptAndDecryptData } from "../../src/util/encryptAndDecryptData";

const data = {
    name: "erick",
    cel: 123456789
}

const userModerador = {
    username: "ClienteWebApp",
    clave: "cliente12web05app"
}

const userAdmin = {
    username: "admin",
    clave: "admin1234"
}

const dataEncrypt = "U2FsdGVkX19bOFnMZHixlt3qBr0eKkav6uy5iO3a38B3arCzPHVioORjPnxfKBU9LJYXZRsBK6ekHgqso2nAqg==";

describe("Encrypt and decrypt data", () => {
    describe("ENCRYPT", () => {

        it("should return the data encrypt", () => {
            try {
                const encrypt = encryptAndDecryptData.encrypt(data);
                //console.log(encrypt)
                expect(encrypt).toMatch(/U2/)
                
            } catch (error) {
                expect(error).toBe('error')
            }
        });

    });

    describe("DECRYPT", () => {

        it("should return the data decrypt", () => {
            try {
                const decrypt = encryptAndDecryptData.decrypt(dataEncrypt);
                expect(decrypt).toEqual(data)
                
            } catch (error) {
                expect(error).toBe('error')
            }
        });

    });

});