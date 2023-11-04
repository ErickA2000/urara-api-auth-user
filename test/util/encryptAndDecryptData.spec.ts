import { encryptAndDecryptData } from "../../src/util/encryptAndDecryptData";
import { user, userAdmin, userModerador } from "../constanst";

let encrypt = "";

describe("Encrypt and decrypt data", () => {
    describe("ENCRYPT", () => {

        it("should return the data encrypt", () => {
            try {
                encrypt = encryptAndDecryptData.encrypt(user);
                
                expect(typeof encrypt).toBe('string')
                
            } catch (error) {
                expect(error).toBe('error')
            }
        });

    });

    describe("DECRYPT", () => {

        it("should return the data decrypt", () => {
            try {
                const decrypt = encryptAndDecryptData.decrypt(encrypt);
                expect(decrypt).toEqual(user)
                
            } catch (error) {
                expect(error).toBe('error')
            }
        });

    });

});