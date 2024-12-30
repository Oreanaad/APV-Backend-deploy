import Paciente from "../models/PacienteModel.js"


const agregarPaciente = async(req, res) =>{
    
const paciente = new Paciente(req.body)
paciente.veterinario= req.veterinario._id;


try {
    const pacienteGuardado = await paciente.save()
    res.json(pacienteGuardado)
} catch (error) {
    console.log(error);
}
}

const obtenerPacientes = async(req,res)=>{

    console.log(req.veterinario)
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario)
    res.json(pacientes)

}

const obtenerPaciente = async  (req, res)=>{

    const {id} = req.params

    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(404).json({msg: 'no encontrado'})
    }
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){ //cuando comparemos los ids en mongodb mejor llevarla a string

       return res.json({msg: 'Accion no valida'})
    }


    res.json(paciente)

}

const actualizarPaciente = async (req,res)=>{

    const {id} = req.params
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(404).json({msg: 'no encontrado'})
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){ //cuando comparemos los ids en mongodb mejor llevarla a string

      return  res.json({msg: 'Accion no valida'})
    }
 //actualizar paciente
    paciente.nombre = req.body.nombre || paciente.nombre
    paciente.propietario = req.body.propietario || paciente.propietario
    paciente.email = req.body.email || paciente.email
    paciente.fechaAlta = req.body.fechaAlta || paciente.fechaAlta
    paciente.sintomas = req.body.sintomas || paciente.sintomas 
    try {
        const pacienteActualizado = await paciente.save()
        res.json(pacienteActualizado)
    } catch (error) {
        console.log(error);
    }

}

const eliminarPaciente = async(req, res)=>{

    const {id} = req.params
    const paciente = await Paciente.findById(id);

    if(!paciente){
        return res.status(404).json({msg: 'no encontrado'})
    }

    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){ //cuando comparemos los ids en mongodb mejor llevarla a string

      return  res.json({msg: 'Accion no valida'})
    }

    try {
       await paciente.deleteOne()
       res.json({msg:"paciente eliminado"})
    } catch (error) {
        console.log(error);
    }

}
export{
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}