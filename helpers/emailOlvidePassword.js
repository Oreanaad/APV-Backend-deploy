import nodemailer from "nodemailer"

const emailOlvidePassword = async(datos)=> {


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
    subject: "Reestablece tu password",
    text: "Comprueba tu cuenta en APV",
    html: `<p> Hola ${nombre}, has solicitado reestablecer tu password</p>

           <p>Siguie el siguiente enlace para resetear tu password:
           <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer password </a></p>

           <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
           ` 

  })
console.log("Mensaje enviado:%s", info.messageId)
}

export default emailOlvidePassword