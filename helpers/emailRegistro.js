import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {
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
        console.log('Servidor listo para enviar correo');
        const info = await transport.sendMail({
        from: 'APV - Administrador de Paciente de Veterinaria',
        to:email,
        subject:'Comprueba tu cuenta en APV',
        text: 'Comprueba tu cuenta en apv',
         html: `
            <p>Hola <strong>${nombre}</strong>, comprueba tu cuenta en APV.</p>
            <p>Tu cuenta ya está lista. Solo debes comprobarla haciendo clic en el siguiente enlace:</p>
            <p>
                <a href="${process.env.FRONTEND_URL}/confirmar/${token}" style="color:#1a73e8;">
                Comprobar Cuenta
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
export default emailRegistro;