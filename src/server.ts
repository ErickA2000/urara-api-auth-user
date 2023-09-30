import dotenv from 'dotenv';
dotenv.config();

import { createRole, createAdm } from '@Libs/initialSetup';
import App from './app';

const server = new App();

const initialSetup = async () => {

    await createRole();
    await createAdm();
}

initialSetup();

server.start();