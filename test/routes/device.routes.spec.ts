import { connectDB, disconnectDB } from "../../src/database";
import { userAdmin, device, CODES_HTTP } from "../constanst";
import { post, get } from "../helpers/petitions";
import type { Response } from "supertest";
import { encrypt } from "../helpers/encrypt";

const baseUrl = "/v1/api/devices";

describe( "Test devices routes", () => {
    beforeAll( () => {
        connectDB();
    })

    afterAll( () => {
        disconnectDB();
    })

    let token: string;

    //Login as administrator
    describe( "Login as administrator", () => {
        const url = `/v1/api/auth/loginPanel`;

        it("should respond with 200 status code", async () => {
            const reqEncryp = encrypt(userAdmin.good);
            const response = await post(url, reqEncryp);
            token = response.header["token"];
            expect(response.statusCode).toBe(CODES_HTTP.OK);
        })
    })

    //POST add device
    describe("POST add device", () => {
        const url = `${baseUrl}/add`;

        describe("SUCCESS REQUEST", () => {

            let response: Response;

            it("should respond with 200 status code", async () => {
                const reqEncryp = encrypt(device);
                response = await post(url, reqEncryp, token);
                expect(response.statusCode).toBe(CODES_HTTP.OK);
            })

            it("should respond with a object", () => {
                expect(response.body).toBeInstanceOf(Object);
            })

            it("should respond with a property <success> in true", () => {
                expect(response.body.success).toBe(true);
            })

        });

        describe("FAIL REQUEST", () => {
            
            it("should respond with 401 status code", async () => {

                const lengthToken = token.length;
                let modiToken = token.slice(0, lengthToken - 1);

                const reqEncryp = encrypt(device);
                const response = await post(url, reqEncryp, modiToken);
                expect(response.statusCode).toBe(CODES_HTTP.UNAUTHORIZED);
            });

            // it("should respond with 500 status code when decrypt fail and property <success> in false", async () => {
                
            //     const response = await post(url, failReqEncrypt, token);
            //     expect(response.statusCode).toBe(CODES_HTTP.INTERNAL_SERVER_ERROR);
            //     // expect(response.body.success).toBe(false);
            // })
            
        })
    });

    //GET all devices
    describe("GET all devices", () => {
        const url = `${baseUrl}`;

        describe("SUCCESS REQUEST", () => {
            let response: Response;

            it("should respond with 200 status code", async () => {
                response = await get(url, token);
                expect(response.statusCode).toBe(CODES_HTTP.OK);
            })

            it("should respond with a object", () => {
                expect(response.body).toBeInstanceOf(Object);
            })

            it("should respond with a property <success> in true", () => {
                expect(response.body.success).toBe(true)
            })
        })

        describe("FAIL REQUEST", () => {
            
            it("should respond with 401 status code", async () => {
                const lengthToken = token.length;
                let modiToken = token.slice(0, lengthToken - 1);

                const response = await get(url, modiToken);
                expect(response.statusCode).toBe(CODES_HTTP.UNAUTHORIZED)
            })

            it("should respond with unauthorized when no provided the token", async () => {
                const response = await get(url);
                expect(response.body.success).toBe(false);
            })

        })
    })

    //GET devices by user
    describe("GET devices by user", () => {
        const url = `${baseUrl}/user`;

        describe("SUCCESS REQUEST", () => {
            let response: Response;

            it("should respond with 200 status code", async () => {
                response = await get(url, token);
                expect(response.statusCode).toBe(CODES_HTTP.OK);
            })

            it("should respond with a object", () => {
                expect(response.body).toBeInstanceOf(Object);
            })

            it("should respond with a property <success> in true", () => {
                expect(response.body.success).toBe(true)
            })
        })

        describe("FAIL REQUEST", () => {
            
            it("should respond with 401 status code", async () => {
                const lengthToken = token.length;
                let modiToken = token.slice(0, lengthToken - 1);

                const response = await get(url, modiToken);
                expect(response.statusCode).toBe(CODES_HTTP.UNAUTHORIZED)
            })

            it("should respond with unauthorized when no provided the token", async () => {
                const response = await get(url);
                expect(response.body.success).toBe(false);
            })
        })
    })

    //GET verify device
    describe("GET verify device", () => {
        const url = `${baseUrl}/verify`;

        describe("SUCCESS REQUEST", () => {
            let response: Response;

            it("should respond with 200 status code", async () => {
                response = await get(url, token);
                expect(response.statusCode).toBe(CODES_HTTP.OK);
            })

            it("should respond with a object", () => {
                expect(response.body).toBeInstanceOf(Object);
            })

            it("should respond with a property <success> in true", () => {
                expect(response.body.success).toBe(true)
            })
        })

        describe("FAIL REQUEST", () => {
            
            it("should respond with 404 status code when device no found", async () => {
                const lengthToken = token.length;
                let modiToken = token.slice(0, lengthToken - 1);

                const response = await get(url, modiToken);
                expect(response.statusCode).toBe(CODES_HTTP.NO_FOUND)
            })

            it("should respond with no provided the token", async () => {
                const response = await get(url);
                expect(response.body.success).toBe(false);
                expect(response.statusCode).toBe(CODES_HTTP.BAD_REQUEST)
            })
        })
    })

    //GET this device
    describe("GET this device", () => {
        const url = `${baseUrl}/this`;

        describe("SUCCESS REQUEST", () => {
            let response: Response;

            it("should respond with 200 status code", async () => {
                response = await get(url, token);
                expect(response.statusCode).toBe(CODES_HTTP.OK);
            })

            it("should respond with a object", () => {
                expect(response.body).toBeInstanceOf(Object);
            })

            it("should respond with a property <success> in true", () => {
                expect(response.body.success).toBe(true)
            })
        })

        describe("FAIL REQUEST", () => {
            
            it("should respond with 401 status code", async () => {
                const lengthToken = token.length;
                let modiToken = token.slice(0, lengthToken - 1);

                const response = await get(url, modiToken);
                expect(response.statusCode).toBe(CODES_HTTP.UNAUTHORIZED)
            })

            it("should respond with no provided the token", async () => {
                const response = await get(url);
                expect(response.body.success).toBe(false);
                expect(response.statusCode).toBe(CODES_HTTP.UNAUTHORIZED)
            })
        })
    })

})