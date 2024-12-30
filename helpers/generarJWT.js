import jwt from 'jsonwebtoken'
const generarJWT =(id)=>{
return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn:'30d', //pide cada 30 dias que se autentifique el usuario

})
}

export default generarJWT

