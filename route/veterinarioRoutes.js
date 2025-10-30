import express from 'express'
import {registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, actualizarPerfil, nuevoPassword, actualizarPassword} from '../controllers/veterinarioControllers.js';
import checkAuth from '../middleware/authMiddleware.js';
// Configuracion para las rutas.
const router = express.Router();

// Area publica 
router.post('/', registrar);
router.get(`/confirmar/:token`, confirmar);
router.post('/login', autenticar);
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);

// Area Privada
router.get('/perfil', checkAuth, perfil);
router.put('/perfil/:id', checkAuth, actualizarPerfil)
router.put('/actualizar-password', checkAuth, actualizarPassword);

export default router;