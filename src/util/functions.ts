import { Socket } from "net";

export const generarClave = (num: number): string => {
    let clave = Math.random().toString(36).substring(0, num);
    return clave
}

export const getSocketProgress = (socket: Socket) => {
    const socketBytes = new Map();

    const currBytesRead = socket.bytesRead;
    let prevBytesRead;
    if (!socketBytes.has(socket)) {
        prevBytesRead = 0;
    } else {
        prevBytesRead = socketBytes.get(socket).prevBytesRead;
    }
    socketBytes.set(socket, {prevBytesRead: currBytesRead})
    return (currBytesRead-prevBytesRead)/1024;
} 