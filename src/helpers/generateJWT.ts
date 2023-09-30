import jwt  from "jsonwebtoken";

const generateToken = ( data: string | Object, expiresIn: number ): string => {
    return jwt.sign( { _id: data }, process.env.TOKEN_SECRET || 'tokentest',
        {
            expiresIn: `${expiresIn}h`
        }
    )
}

export default generateToken;