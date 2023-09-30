import { IOptionsSendEmail, IResturns } from '@Interfaces/globals.interfaces';
import nodemailer from 'nodemailer';
import generateToken from './generateJWT';

const showDataLog = require("../util/logger/logger")

const sendEmail = ( email: string, title: string, body: string, options?: IOptionsSendEmail ): IResturns => {
    let error!: unknown;
    let res!: unknown;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.EMAIL_ADDRESS}`,
            pass: `${process.env.EMAIL_PASSWORD}`
        }
    });

    //Generar url confirmacion con token
    if( options?.generateToken ){
        const token: string = generateToken( email , 1 );
        const urlConfirm = `${process.env.CLIENT_URL}/auth/confirm/${token}`;
        body += `<a href="${urlConfirm}" target="_black">Confirmar</a> </p>`;
    }

    const mailOptions = {
        from: `${process.env.EMAIL_ADDRESS}`,
        to: `${email}`,
        subject: title,
        html: body
    };

    transporter.sendMail(mailOptions, (err, response) => {
        if (err) {
            showDataLog.warn({ message: `Error al enviar email restablecimiento contraseña ${err}` })
            error = err;
        } else {
            res = response;
        }
    });

    if( error ){
        return {
            success: false,
            message: error
        }
    }
    return {
        success: true,
        message: res
    }
}

export default sendEmail;