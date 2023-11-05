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
    }
};

export const encryptUser = {
    modetator: "U2FsdGVkX1/8S139B6aSLRJu7SYR22mmj9VAtRro7wjMHVCR+lzMnl/nW/hm9D+UoxUKP/XXmtaBeHuEuGptSTwnkrjao8a8/JoaqckR+nA=",
    admin: "U2FsdGVkX1+yGiqWWP0rTsQbT2Z9UfKHqoaIb7hIKYOrqD9quQQmZNqoywPnGEVm7S26xNGhUV6ZhCE84FbEBg==", 
    user: "U2FsdGVkX1+qFjeVcJEfRTCHZiJsnaMYb1XRkILKi/wD4E/29kKtPTcjjYBpXHz86vhzm6FFu4IKsj8N0xRgn1EffW0S5+/oaQeWWV4dtbo="
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