import { generarClave } from "../../src/util/functions";

describe( "Utils functions", () => {

    describe( "Function generate password", () => {

        let pass = "";
        const lengthPass = 6;

        it( "should return the password in string", () => {
            pass = generarClave( lengthPass );

            expect( typeof pass).toBe('string');
        } )

        it( `should return the password with length ${lengthPass}`, () => {

            expect(pass.length).toBe(lengthPass);

        })

    } )

} )