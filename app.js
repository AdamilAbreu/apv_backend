import express from 'express';
import conectarDB from './config/db.js';
import dotenv from 'dotenv'
import veterinarioRoutes from './route/veterinarioRoutes.js';
import pacienteRoutes from './route/pacienteRoute.js';
import cors from 'cors';

dotenv.config(); // primero cargar .env

const app = express();

// Middleware para leer JSON
app.use(express.json());

conectarDB();
// Cors
// Api de el FrontEnd
const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1){
        callback(null, true)
        }else{
        callback(new Error('No permitido por Cors'));
         }
    }
}

app.use(cors(corsOptions));
// Creando el routing
app.use('/api/veterinarios', veterinarioRoutes)
app.use('/api/pacientes', pacienteRoutes)

// Configurando puerto.
const port = process.env.PORT || 4000;
app.listen(port, () => {

})