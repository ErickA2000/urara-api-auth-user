import { devicesDAO } from "@DAO/Devices.dao";
import verifyJWT from "@Helpers/verifyJWT";
import { Request, Response } from "express";
import { CODES_HTTP } from "@Constants/global";
import { encryptAndDecryptData } from "@Utils/encryptAndDecryptData";

class DevicesController{

    public async getAllDevices( req: Request, res: Response ){

        devicesDAO.getAll()
            .then( devices => {
                //aca encriptar respuesta <<devices>>
                let dataEncrypt: string;
                try {
                    dataEncrypt = encryptAndDecryptData.encrypt( devices );
                } catch (error) {
                    return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
                        success: false,
                        message: "Error al encriptar data"
                    })
                }

                res.status(CODES_HTTP.OK).json({
                    success: true,
                    data: dataEncrypt
                })
            })
            .catch( err => {
                res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: "Error al obtener dispositivos | Error ->" + err
                })
            })
        
    }

    public async getDevicesByUser( req: Request, res: Response ){
        
        devicesDAO.getByUser( req.userId )
            .then( devices => {
                //aca encriptar respuesta <<devices>>

                let dataEncrypt: string;
                try {
                    dataEncrypt = encryptAndDecryptData.encrypt( devices );
                } catch (error) {
                    return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
                        success: false,
                        message: "Error al encriptar data"
                    })
                }

                res.status(CODES_HTTP.OK).json({
                    success: true,
                    data: dataEncrypt
                })
            })
            .catch( err => {
                res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: "Error al obtener dispositivos | Error ->" + err
                })
            })

    }

    public async getThisDevice( req: Request, res: Response ){
        const token = req.header('token');

        if( !token ) return res.status(CODES_HTTP.BAD_REQUEST).json({
            success: false,
            message: "Token no proveido"
        });

        const device = await devicesDAO.getOneByToken( token );

        if( !device ) return res.status(CODES_HTTP.NO_FOUND).json({
            success: false,
            message: "Dispositivo no encontrado"
        });

        let dataEncrypt: string;
        try {
            dataEncrypt = encryptAndDecryptData.encrypt( device );
        } catch (error) {
            return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Error al encriptar data"
            })
        }

        res.status(CODES_HTTP.OK).json({
            success: true,
            data: dataEncrypt
        })
    }

    public async addNewDevice( req: Request, res: Response ){
        const { ipv4, ubicacion, plataform } = req.body;
        const addNewDevice = req.body;
        
        const devices = await devicesDAO.getByUser( req.userId );
        
        if( devices.length != 0 ){
            for( let device of devices ){
                if( device.dispositivo == addNewDevice.dispositivo && device.navegador == addNewDevice.navegador ){

                    const updateDevice = {
                        activa: true,
                        estado: "activa",
                        token: req.header('token'),
                        ipv4,
                        ubicacion,
                        plataform
                    }
                    await devicesDAO.update( device._id, updateDevice );

                    return res.status(CODES_HTTP.OK).json({
                        success: true,
                        message: "Actualizada sesión en dispositivo"
                    })
                } 
            }
        }   

        //agregando token
        addNewDevice.token = req.header('token');
        
        //agregar id de usuario
        addNewDevice.idUsuario = req.userId;
        
        devicesDAO.add( addNewDevice )
            .then( device => {

                res.status(CODES_HTTP.OK).json({
                    success: true,
                    message: "Nuevo dispositivo agregado"
                })

            })
            .catch( err => {
                res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
                    success: false,
                    message: "Error al agregar nuevo dispositivo | Error ->" + err
                })
            })
        
    }

    public async updateDevice( req: Request, res: Response ){
        const { estado, activa } = req.body;

        let device = await devicesDAO.getOneById( req.params.deviceId );
    
        if( !device ){
            return res.status(CODES_HTTP.FORBIDDEN).json({
                success: false,
                message: "Dispositivo no encontrado"
            })
        }

        //buscar que el id del usuario corresponda con el dispositivo
        if( device ){
            
            if( device.idUsuario != req.userId ){
                return res.status(CODES_HTTP.FORBIDDEN).json({
                    success: false,
                    message: "El dispositivo no corresponde con el usuario"
                })
            }
        }

        devicesDAO.update( req.params.deviceId, { estado, activa } )
            .then( device => {
                res.status(CODES_HTTP.OK).json({
                    success: true
                })
            })
            .catch( err => {
                return res.status(CODES_HTTP.INTERNAL_SERVER_ERROR).json({
                    success: false
                })
            })
    }

    public async verifyTokenDevices( req: Request, res: Response ){
        const token = req.header('token');

        if( !token ) return res.status(CODES_HTTP.BAD_REQUEST).json({
            success: false,
            message: "Token no proveido"
        });

        const device = await devicesDAO.getOneByToken( token );

        if( !device ) return res.status(CODES_HTTP.NO_FOUND).json({
            success: false,
            message: "Dispositivo no encontrado"
        });

        const verifyToken = verifyJWT( token );

        if( verifyToken.success === false ){
            await devicesDAO.update( device._id, { estado: "inactivo", activa: false } );

            return res.status(CODES_HTTP.UNAUTHORIZED).json({
                success: false,
                message: "No autorizado"
            })
        }

        if( device.activa === false ){
            return res.status(CODES_HTTP.UNAUTHORIZED).json({
                success: false,
                message: "No autorizado"
            })
        }

        res.status(CODES_HTTP.OK).json({
            success: true,
            message: "Autorizado"
        });
    }

}

export const devicesController = new DevicesController();