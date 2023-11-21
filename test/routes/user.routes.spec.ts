import { connectDB, disconnectDB } from "../../src/database";
import { createUser, userAdmin, CODES_HTTP } from "../constanst";
import { post, get, put } from "../helpers/petitions";
import type { Response } from "supertest";
import { encrypt } from "../helpers/encrypt";

const baseUrl = "/v1/api/users";

describe("Test user routes", () => {

    beforeAll( () => {
        connectDB();
    })

    afterAll( () => {
        disconnectDB();
    })

    let token: string;

    //Login as administrator
    describe("Login as administrator", () => {
        const url = `/v1/api/auth/loginPanel`;

        it("should respond with 200 status code", async () => {
            const reqEncryp = encrypt(userAdmin.good);
            const response = await post(url, reqEncryp);
            token = response.header["token"];
            expect(response.statusCode).toBe(CODES_HTTP.OK);
        })
    });

    //POST create user
    describe("POST create user", () => {
        const url = `${baseUrl}/create`;

        describe("SUCCESS REQUEST", () => {

            let response: Response;

            it("should respond with 200 status code",async () => {
                const reqEncryp = encrypt(createUser);
                response = await post(url, reqEncryp, token);
                expect(response.statusCode).toBe(CODES_HTTP.OK)
            })

            it("should respond with a object", () => {
                expect(response.body).toBeInstanceOf(Object)
            })

            it("should respond with a property <success> in true", () => {
                expect(response.body.success).toBe(true)
            })

        })

        describe("FAIL REQUEST", () => {

            it("should respond with unauthorized when no provided the token", async () => {
                const reqEncryp = encrypt(createUser);
                const response = await post(url, reqEncryp);
                expect(response.statusCode).toBe(CODES_HTTP.UNAUTHORIZED);
            })

            it("should respond with 400 status code when no provided in body the role", async () => {
                let user = createUser;
                delete user.roles;

                const reqEncryp = encrypt(user);
                const response = await post(url, reqEncryp, token);
                expect(response.statusCode).toBe(CODES_HTTP.BAD_REQUEST)
            })

            it("should respond with 400 status code when the role does not exist", async () => {
                let user = createUser;
                user.roles = ["admi"];

                const reqEncryp = encrypt(user);
                const response = await post(url, reqEncryp, token);
                expect(response.statusCode).toBe(CODES_HTTP.BAD_REQUEST);
                expect(response.body.success).toBe(false);
            })

            it("should respond with 400 status code when username exist", async () => {
                let user = createUser;
                user.username = "admin";

                const reqEncryp = encrypt(user);
                const response = await post(url, reqEncryp, token);
                expect(response.statusCode).toBe(CODES_HTTP.BAD_REQUEST);
                expect(response.body.success).toBe(false);
            })
        })

    })

    //

})