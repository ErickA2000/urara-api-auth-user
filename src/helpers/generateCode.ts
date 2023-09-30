const generateCode = ( length: number ): string => {
    let code: string = "";

    for ( let i = 1; i <= length; i++ ){
        let character = Math.floor( Math.random() * 9 );
        code += character;
    }

    return code;
}

export default generateCode;