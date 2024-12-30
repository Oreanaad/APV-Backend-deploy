import express from "express";
const router = express.Router();
import { 
    registrar, 
    perfil, 
    confirmar, 
    autenticar, 
    olvidepassword, 
    comprobarToken, 
    actualizarPerfil,
    actualizarPassword,
    nuevoPassword} from "../controllers/veterinarioControllers.js";
import checkOut from "../middleware/outMiddleware.js";

//Sistema de rutado para cada pagina 

//Ruras del área publica, es decir no requiere cuenta
router.post('/', registrar )
router.get('/confirmar/:token', confirmar) //token es un parametro dinamico
router.post('/login', autenticar)
router.post('/olvide-password', olvidepassword)
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword)// de esta forma unimos dos routes que comparten el mismo url

//Area privada 
router.get('/perfil', checkOut, perfil )
router.put('/perfil/:id', checkOut, actualizarPerfil)
router.put('/actualizar-password', checkOut, actualizarPassword)
export default router;
