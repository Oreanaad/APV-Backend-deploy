import mongoose from "mongoose";
import Veterinario from "./VeterinarioModel.js";

const pacienteSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true
    },
    propietario:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    fechaAlta:{
        type: Date,
        required: true,
        default: Date.now()
    },
    sintomas:{
        type: String,
        required: true
    },
    veterinario:{
        type: mongoose.Schema.Types.ObjectId, //para buscar el veterinario de cada paciente en la db
        ref: "Veterinario"
    },
},

{
    timestamps: true,

})

const Paciente = mongoose.model("Paciente", pacienteSchema)

export default Paciente