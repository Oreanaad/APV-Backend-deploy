import express from "express";//dependencias que se instalan no requieren extecion
import conectarDB from "./config,/bd.js"; // dependencias que nosotros creamos si requieren la extencion
import dotenv from 'dotenv';
import  cors from 'cors'
import VeterinarioRoutes from "./routes/veterinarioRoutes.js";
import PacientesRoutes from "./routes/pacienteRoutes.js"



const app = express();
app.use(express.json()) //para conectar con postman y que funcione cuando llamamos 
dotenv.config();

conectarDB();

//Busca si esta en la lista de dominios permitidos y permite acceso

app.use(cors({
    origin: [process.env.FRONTEND_URL] // Replace with your frontend's actual URL

}));
app.use("/api/veterinarios", VeterinarioRoutes)
app.use("/api/pacientes", PacientesRoutes)

const PORT = process.env.PORT || 4000
app.listen(PORT, ()=>{
    console.log(`Funcionando papa en el puerto ${PORT}`);
})

