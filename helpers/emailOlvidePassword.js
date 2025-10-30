import nodemailer from 'nodemailer'

const emailOlvidePassword = async (datos) => {
    var transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
    // No usar el puerto - 2525 para el correo.
    });
    const {email,nombre, token} = datos;
    // Enviar el email

    try {
        await transport.verify();
        const info = await transport.sendMail({
        from: 'APV - Administrador de Paciente de Veterinaria',
        to:email,
        subject:'Restablece tu Password',
        text: 'Restablece tu Password',
         html: `
            <p>Hola ${nombre}, Ha solicitado restablecer tu Password</p>

            <p>Sigue el siguiente enlace para generar un nuevo Password: </p>
            <p>
                <a href="${process.env.FRONTEND_URL}/olvide-password/${token}" style="color:#1a73e8;">
                Restablecer Password
                </a>
            </p>
            <p>Si tú no creaste esta cuenta, puedes ignorar este mensaje.</p>
            `,
        })
      console.log('📧 Email enviado:', info.messageId);
    } catch (error) {
        console.log(error);
    }
}
export default emailOlvidePassword;