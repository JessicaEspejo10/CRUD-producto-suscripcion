/* --------------------------- Import dependencies -------------------------- */
import express from 'express'; //framework


/* ----------------- Framework and variables Initialization ----------------- */
const app = express();

/* --------------------- Server Settings and Handlebars --------------------- */
app.set('port', process.env.PORT || 3000); //asignar información a variable puerto

/* --------------------------- Middlewares (Morgan) ------------------------- */


/* --------------------------------- Routes --------------------------------- */


/* ------------------------------ Public files ------------------------------ */


/* ------------------------------- Run server ------------------------------- */
app.listen(app.get('port'), () => {
    console.log('Server listening on port', app.get('port'));
}); //escuche puerto 3000 y escriba en consola cuando este escuchando