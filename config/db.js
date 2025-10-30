import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        const conexionDB = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology:true
        });
        const url = `${conexionDB.connection.host}:${conexionDB.connection.port}`
        console.log(`Mongo dbb conectacdo en: ${url}`)
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1); // Esto imprimira un mensaje de error
    }
}
export default conectarDB;