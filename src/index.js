/* --------------------------- Import dependencies -------------------------- */
import express from 'express'; //framework

import {join,dirname} from 'path'; //metodos del modulo path para concatenar info, identificar directorios
import {fileURLToPath} from 'url'; //metodos del modulo url para obtener la url principal del proyecto
import {engine} from 'express-handlebars'; //metodo para configurar el uso de manejo de plantillas

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


/* --------------------------------- Routes --------------------------------- */


/* ------------------------------ Public files ------------------------------ */


/* ------------------------------- Run server ------------------------------- */
app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
}); //escuche puerto 3000 y escriba en consola cuando este escuchando