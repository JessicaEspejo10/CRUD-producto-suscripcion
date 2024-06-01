/* --------------------------- Import dependencies -------------------------- */
import express from 'express'; //framework
import morgan from 'morgan';

import {join,dirname} from 'path'; //metodos del modulo path para concatenar info, identificar directorios
import {fileURLToPath} from 'url'; //metodos del modulo url para obtener la url principal del proyecto
import {engine} from 'express-handlebars'; //metodo para configurar el uso de manejo de plantillas
import subscRouter from './routes/subscriptions.routes.js';

/* ----------------- Framework and variables Initialization ----------------- */
const app = express();

/* ---------- Avoid colission between variable and method from path --------- */
const __dirname = dirname(fileURLToPath(import.meta.url));

/* --------------------- Server Settings and Handlebars --------------------- */
app.set('port', process.env.PORT || 3000); //asignar información a variable puerto
app.set('views', join(__dirname, 'views'));  //concatena ruta principal con carpeta src

app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'), //modulos con plantillas generales
    partialsDir: join(app.get('views'), 'partials'), //modulos como incio, mision, contacto
    extname: '.hbs'
}));//configuracion de engine

app.set('view engine', '.hbs');//especificar el manejador de plantillas

/* --------------------------- Middlewares (Morgan) ------------------------- */
app.use(morgan('dev')); //leer peticion realizada desde el navegador
app.use(express.urlencoded({ extended: false})); //apagar la codificacion de url para facilitar la lectura de la informacion
app.use(express.json()); //recibir informacion en formato json

/* --------------------------------- Routes --------------------------------- */
app.get('/', (req,res) => {
    res.render('index');
});

app.use(subscRouter);


/* ------------------------------ Public files ------------------------------ */
app.use(express.static(join(__dirname,'public')));

/* ------------------------------- Run server ------------------------------- */
app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
}); //escuche puerto 3000 y escriba en consola cuando este escuchando