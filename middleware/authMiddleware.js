import jwt from 'jsonwebtoken'
import veterinario from '../models/Veterinario.js';
const checkAuth = async (req, res, next) => {
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
            try {
                token = req.headers.authorization.split(" ")[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.veterinario = await veterinario.findById(decoded.id).select(
                    "-password -token -confirmado");
                return next(); // Siguiente middleware.
            } catch (error) {
                const e = new Error('token no valido')
                return res.status(403).json({msg: e.message});    
            }
    }
    if(!token){
        const e = new Error('token no valido o Inexistente')
        res.status(403).json({msg: e.message});  
    }
    next(); // Siguiente Middleware

}

export default checkAuth;