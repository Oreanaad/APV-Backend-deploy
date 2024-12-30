import nodemailer from "nodemailer"

const emailRegistro = async(datos)=> {


    //Codigo extraido de mailtrap para los emails, los valores seran agregados al archivo .env
    //Credenciales de email
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const{email,  nombre, token} = datos

  //Enviar el email
  const info = await transporter.sendMail({
    from:'APV - Administrados de pacientes de veterinaria',
    to: email,
    subject: "Comprueba tu cuenta en APV",
    text: "Comprueba tu cuenta en APV",
    html: `<p> Hola ${nombre}, comprueba tu cuenta en APV.</p>

           <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:
           <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a></p>

           <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
           ` 

  })
console.log("Mensaje enviado:%s", info.messageId)
}

export default emailRegistro