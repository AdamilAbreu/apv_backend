import e from 'express';
import Pacientes from '../models/Paciente.js';
import mongoose from 'mongoose';

const agregarPaciente = async (req,res) => {

    // Crear un nuevo paciente con las informaciones.
    const paciente = new Pacientes(req.body);
    paciente.veterinario = req.veterinario._id;
    try {
        const pacienteAlmacenado = await paciente.save();
        res.json(pacienteAlmacenado);
    } catch (error) {
        console.log(error);
    }
}   
const obtenerPacientes = async (req,res) => {
    const paciente = await Pacientes.find()
        .where('veterinario')
        .equals(req.veterinario);
    res.json(paciente);
}

const obtenerPaciente = async (req, res) =>{
    const {id} = req.params;
    const paciente = await Pacientes.findById(id);
    if(!paciente){
         res.status(404).json({msg:"Paciente no encontrado"})
    }
    // Solo el veterinario que registro el paciente puede ver sus credenciales y informaciones.
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg:"Accion no valida"});
    }
    res.json(paciente);
}
const actualizarPaciente = async (req, res) =>{
    const {id} = req.params;
    const paciente = await Pacientes.findById(id);
    if(!paciente){
         res.status(404).json({msg:"Paciente no encontrado"})
    }
    if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return res.json({msg:"Accion no valida"})
    }
    const { nombre, propietario, email, fecha, sintomas} = req.body;
    // Actualizar Paciente.
    paciente.nombre = nombre || paciente.nombre;
    paciente.propietario = propietario || paciente.propietario;
    paciente.email = email || paciente.email;
    paciente.fecha = fecha || paciente.fecha;
    paciente.sintomas = sintomas || paciente.sintomas;

    try {
        const pacienteActualizado = await paciente.save();
        res.json(paciente);
    } catch (error) {
        console.log(error);
    }
}
const eliminarPaciente = async (req, res) => {
    
    try {
        const {id} = req.params;
        // if(!mongoose.Types.ObjectId.isValid(id)){
        //     return res.status(400).json({ msg: "ID no válido" });
        // }
        const paciente = await Pacientes.findById(id);
        if(!paciente){
            return res.status(404).json({msg:"Paciente no encontrado"})
        }
        if(paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
            return res.json({msg:"Accion no valida"})
        }
        // Elimina el paciente.
        await paciente.deleteOne();
        res.json({msg:"Paciente eliminado"})
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