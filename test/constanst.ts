export const userModerador = {
    username: "ClienteWebApp",
    clave: "cliente12web05app"
};

export const userAdmin = {
    good: {
        username: "admin",
        clave: "admin1234"
    },
    wrongPass: {
        username: 'admin',
        clave: "admin123"
    },
    noExistent: {
        username: 'inexistente',
        clave: "user1general52c"
    },
    noVerify: {
        username: 'test1',
        clave: '11eeeee'
    }
}

export const user = {
    good: {
        username: 'general',
        clave: "user1general52compra"
    },
    wrongPass: {
        username: 'general',
        clave: "user1general52"
    },
    noExistent: {
        username: 'inexistente',
        clave: "user1general52c"
    },
    noVerify: {
        username: 'user_test0.27711777121470305',
        clave: '11eeeeee'
    }
};



export const newUser = {
    nombre: "nombre prueba",
    telefono: {
        codigo_area: "+57",
        numero: "3124567890"
    },
    email: `failemail${ Math.random() }@gmail.com`,
    username: `user_test${ Math.random() }`,
    clave: "11eeeeee",
    verify2fa: {
        estado: false,
        metodos: [
            {
                tipo: "email",
                estado: false
            }
        ],
        code_access: ""
    }
}