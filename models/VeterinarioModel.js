//Librerias y variables importadas - moondose - DB  / Bcrypt - hasheo de password
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import  generarId from "../helpers/generarId.js"

//Modelo de lo que se enviaria a la base de datos 
const veterinarioSchema = mongoose.Schema({

    nombre:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono:{
        type: String,
        default: null,
        required: false
           },
    web:{
        type: String,
        default: null
    },
    token:{
        type: String,
        default: generarId()
    },
    confirmado:{
        type: Boolean,
        default:false
    }

});

//hasheo de password

veterinarioSchema.pre('save', async function(next){
    if (!this.isModified('password')) {
        next()
    }

    const salt= await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

veterinarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password)
    
}
const Veterinario = mongoose.model("Veterinario", veterinarioSchema)

export default Veterinario;


//instalar dependencia para hashear el password ""npm i bcrypt"