import { encryptAndDecryptData } from "../../src/util/encryptAndDecryptData";

export function encrypt( data: Object ){
    const encrypt = encryptAndDecryptData.encrypt(data);
    return {
        reqEncrypt: encrypt
    }
}