import express, {Application} from 'express';
import morgan from 'morgan';
import cors, { CorsOptions } from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import { queryParser } from 'express-query-parser';
import { connectDB } from './database';
import indexRoutes from '@Routes/index.routes';

const showDataLog = require('./util/logger/logger');

connectDB();

export default class App {
    public app: Application;
    private IP = process.env.IP;

    constructor(){
        this.app = express();
        this.config();
        this.router();
    }

    private corsOptions: CorsOptions = {
        exposedHeaders: ['token'],
        origin: this.getOrigins()

    }

    config(): void{
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors(this.corsOptions));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
        this.app.use( queryParser({
            parseNull: true,
            parseBoolean: true,
            parseNumber: true,
            parseUndefined: true
        }) );
        this.app.use(compression());
        this.app.use(helmet());
    }

    router(): void{
        this.app.use( '/v1',indexRoutes );
    }

    private getOrigins(): string[]{
        
        const origins = process.env.ORIGINS;

        if( origins != undefined ){
            let arrayOrigins = origins.split(',');
            return arrayOrigins;

        }else{
            return ['*']
        }
    }

    start(): void {
        this.app.listen( this.app.get('port'), () => {
            console.log(`Server on http://${this.IP}:${this.app.get('port')}`)
            showDataLog.info({ message: 'Server running' })
        })
    }

    
}