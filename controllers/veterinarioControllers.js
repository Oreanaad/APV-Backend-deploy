import Veterinario from "../models/VeterinarioModel.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

//Registro de usuarios
const registrar = async (req, res)=>{

    //const{email, password, name}= req.body

    //prevenir usuarios duplicados
    const{email, nombre} = req.body
    const existeUsuario = await Veterinario.findOne({ email });

    if(existeUsuario){
        const error = new Error("usuario ya registrado")
        return res.status(400).json({msg: error.message})
    }


    try {
        //guardar un nuevo veterinario
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado= await veterinario.save();

        //Enviar el email
        emailRegistro({
            email,
            nombre, 
            token: veterinarioGuardado.token
        })


        res.json(veterinarioGuardado)
    } catch (error) {
        console.log(error);
    }

   
};

//Mostrar peril
const perfil = (req, res)=>{
   const{veterinario}= req;
   res.json(veterinario)
}


//Confirmacion de creacion de  usuario
const confirmar = async(req, res)=>{
    
    const {token} = req.params

    const usuarioConfirmar = await Veterinario.findOne({token})

    if(!usuarioConfirmar){
        const error = new Error('Token invalido')
        return res.status(404).json({msg: error.message})
            }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();

        res.json({msg: "Usuario confirmado correctamente"})
    } catch (error) {
        console.log(error);
    }

   
}

const autenticar =async(req, res) =>{

    const{email, password} = req.body

    //comprobar si el usuario existe

const usuario = await Veterinario.findOne({email})

if (!usuario) {
    const error = new Error("El usuario no existe")
    return res.status(404).json({msg:error.message})
}

//Comprobar si el usuario esta confirmado 
if(!usuario.confirmado){
    const error = new Error("Tu cuenta no ha sido confirmada")
    return res.status(403).json({ mgs: error.message})
}
//Revisar password
if(await usuario.comprobarPassword(password)){
    
//Autenticar
 
res.json({
    _id: usuario._id,
    nombre: usuario.nombre,
    email: usuario.email,
    token:generarJWT(usuario.id),
    
})
}else{
    const error = new Error("El password es incorrecto")
    return res.status(403).json({msg: error.message})
}
}   

const olvidepassword = async(req, res) =>{
const{email} = req.body

const existeVeterinario = await Veterinario.findOne({email})

if(!existeVeterinario){
    const error = new Error('el usuario no existe')
    return res.status(400).json({msg:error.message})

}

try {
    existeVeterinario.token = generarId() 
    await existeVeterinario.save()

    //Enviar email con instrucciones 

    emailOlvidePassword({
        email,
        nombre: existeVeterinario.nombre,
        token: existeVeterinario.token
    })

    
    res.json({msg: 'Hemos enviado un email con intrucuciones'})

} catch (error) {
    
}
}

const comprobarToken = async (req, res)=>{

    const {token} = req.params //req.params sirve para cuando tenemos una ruta con un token
    console.log(token);
    const tokenValido = await Veterinario.findOne({token})

    if (tokenValido) {
        //Es valido, el usuario existe
        res.json({ms: 'Token valido y el usuario si existe'})
    }else{
        const error = new Error('Token no valido')
        return res.status(400).json({msg: error.message})
    }

}

const nuevoPassword = async(req, res) =>{
    const{token} = req.params 
    const {password} = req.body

    const veterinario = await Veterinario.findOne({token})
    if(!veterinario){
        const error = new Error('hubo un error')
        return res.status(400).json({msg:error.message})
    }

    try {
        veterinario.token  = null
        veterinario.password = password 
        await veterinario.save()
        res.json({msg: 'password modificado correctamente'})
    } catch (error) {
        console.log(error);
    }

} 

const actualizarPerfil= async (req, res)=>{

    console.log(req.params.id)
    console.log(req.body)
    const veterinario = await  Veterinario.findById(req.params.id)
    if(!veterinario){
        const error = new Error('Hubo un reto')
        return res.status(400).json({msg: error.message})
    }

    const {email} = req.body
    if(veterinario.email!==req.body.email){
            const existeEmail = await Veterinario.findOne({email})
    if(existeEmail){
        const error = new Error('Ese email ya esta siendo utilizado')
        return res.status(400).json({msg: error.message})
    }}

    try {
        veterinario.nombre = req.body.nombre 
        veterinario.email = req.body.email 
        veterinario.web = req.body.web 
        veterinario.telefono = req.body.telefono 

        const veterinarioActualizado = await veterinario.save()
        res.json(veterinarioActualizado)
    } catch (error) {

        
    }

}

const actualizarPassword = async (req, res)=>{
//Leer los datos
    const {id}= req.veterinario
    const {pwd_actual, pwd_nuevo} = req.body


//Comprobar que el veterinario exista
const veterinario = await  Veterinario.findById(id)
if(!veterinario){
    const error = new Error('Hubo un error')
    return res.status(400).json({msg: error.message})
}

//Comprobar su password
    if (await veterinario.comprobarPassword(pwd_actual)) {

        //Almacenar el nuevo password
        veterinario.password = pwd_nuevo
        await veterinario.save()
        res.json({msg: 'Password almacenado correctamente'})
    }else{
        const error = new Error('El password actual es incorrecto')
        return res.status(400).json({msg:error.message})
    }

}


export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidepassword,
    comprobarToken,
    nuevoPassword,
    actualizarPerfil,
    actualizarPassword,
}