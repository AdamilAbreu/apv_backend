import mongoose, { mongo } from "mongoose";
import generarId from '../helpers/generarId.js'
import bcrypt from 'bcrypt'

const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required:true,
        trim:true
    },
    password:{
        type: String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    telefono:{
        type:String,
        default:null,
        trim:true
    },
    web:{
        type:String,
        default:null
    },
    token:{
        type:String,
        default: generarId(),
    },
    confirmado:{
        type:Boolean,
        default:false
    }
})

veterinarioSchema.pre('save', async function(next){
    // No volver a hashear el password.
    if(!this.isModified('password')){
        next(); // Ejecuta el siguiente middleware
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

veterinarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    // Compara si son los mismos password almacenado.
    return await bcrypt.compare(passwordFormulario, this.password)
}

const veterinarios = mongoose.model('Veterinario', veterinarioSchema);
export default veterinarios;