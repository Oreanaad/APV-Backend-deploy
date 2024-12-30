import express from 'express'
import{
    agregarPaciente, 
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
} from '../controllers/PacientesControllers.js'

import checkOut from "../middleware/outMiddleware.js"

const router = express.Router();

router.route('/')
.post(checkOut, agregarPaciente)
.get( checkOut, obtenerPacientes) // agregamos el middleware de checkout que ayuda a la autentificacion

router
.route('/:id')
.get(checkOut, obtenerPaciente)
.put(checkOut, actualizarPaciente)
.delete(checkOut, eliminarPaciente)

export default router