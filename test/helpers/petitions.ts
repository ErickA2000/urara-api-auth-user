import req from "supertest";
import App from "../../src/app";

const server = new App();
const app = server.app;

export const get = async ( url: string, token?: string ): Promise<req.Test> => {
    if( token ) return await req(app).get(url).set('token', token)
    return await req(app).get(url)
};

export const post = async ( url:string, data: object, token?: string): Promise<req.Test> => {
    if( token ) return await req(app).post(url).set("token", token).send(data)
    return await req(app).post(url).send(data)
};

export const put = async ( url:string, data: object, token: string): Promise<req.Test> => {
    return await req(app).put(url).set("token", token).send(data)
};