import dotenv from 'dotenv';
dotenv.config();

// import { createRole, createTallas, createCategorias, createAdm, createCounter } from '@Libs/initialSetup';
import App from './app';

const server = new App();

// createRole();
// createTallas();
// createCategorias();
// createAdm();
// createCounter();

server.start();