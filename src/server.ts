import dotenv from 'dotenv';
dotenv.config();

import { createRole, createAdm } from '@Libs/initialSetup';
import App from './app';

const server = new App();

createRole();
createAdm();

server.start();