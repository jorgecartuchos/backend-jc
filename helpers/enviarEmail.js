import nodemailer from "nodemailer";

export const enviarEmail = async (data) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { nombre, correo, asunto, mensaje, activarCarrito, carrito } = data;

  try {
    const sendEmail = await transporter.sendMail({
      from: '"Jorge Cartuchos" <jorgelo1469@gmail.com>',
      to: correo,
      subject: "Solicitud recibida",
      text: `Hola ${nombre},

      ¡Gracias por contactarte con Jorge Cartuchos! He recibido tu solicitud correctamente y la estoy revisando para ofrecerte la mejor asistencia posible. Te contactaré en breve con más detalles.

      Si tienes alguna pregunta adicional mientras tanto, no dudes en responder a este correo o llamarme directamente.

      Gracias por tu paciencia y confianza en Jorge Cartuchos.

      Saludos cordiales,
      Jorge López

      ---

      Teléfono: +57 | 320 568 2187
      Correo Electrónico: jorgelo1469@gmail.com
      Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos a través de este correo, enviar un mensaje por WhatsApp, o visitar nuestra Política de Devoluciones en https://www.jorgecartuchos.com/devoluciones.

      Este correo es confidencial. Si lo ha recibido por error, por favor notifíquenos y elimínelo de inmediato.
      `,
      html: `
      <p>Hola ${nombre},</p>
      <p>¡Gracias por contactarte con Jorge Cartuchos! He recibido tu solicitud correctamente y la estoy revisando para ofrecerte la mejor asistencia posible. Te contactaré en breve con más detalles.</p>
      <p>Si tienes alguna pregunta adicional mientras tanto, no dudes en responder a este correo o llamarme directamente.</p>
      <p>Gracias por tu paciencia y confianza en Jorge Cartuchos.</p>
      <p>Saludos cordiales,</p>
      <p><strong>Jorge López</strong></p>
      <a href="https://www.jorgecartuchos.com/" target="_blank">
        <img src="https://drive.google.com/uc?export=view&id=1OYjzJlDkYsmddNY_rGG7JFUuiwAABWCr" alt="Firma Jorge Cartuchos" style="width: 720px; height: auto;" />
      </a>
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; margin-top: 20px;">
      
        <a style="display: inline-block; margin-right: 5px;" href="https://www.facebook.com/profile.php?id=100067410135870"><img src="https://drive.google.com/uc?export=view&id=11TCCVcLVKdby0oaqjbjj0jNviPgz82jw"/></a>

        <a style="display: inline-block;" href="https://wa.me/573205682187?text=Hola%20Jorge%20Cartuchos%2C%20me%20gustar%C3%ADa%20recibir%20informaci%C3%B3n%20sobre%20los%20t%C3%B3ners%20disponibles.%20%C2%A1Gracias!"><img src="https://drive.google.com/uc?export=view&id=1hCK9nzRtYgQU1XrNfGuzQ6bL4T1OIzQx"/></a>

        <h4 style="margin: 0; font-size: 16px; color: #000; margin-top: 10px;">Contacto</h4>
        <p style="margin: 5px 0;">Teléfono: +57 (320) 568 2187</p>
        <p style="margin: 5px 0;">Correo Electrónico: <a href="mailto:jorgelo1469@jorgelo1469@gmail.com</a></p>
        <p style="font-size: 11px;">Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos a través de este correo, enviar un mensaje por WhatsApp, o visitar nuestra <a href="https://www.jorgecartuchos.com/devoluciones" target="_blank" style="color: #007BFF;">Política de Devoluciones</a>.</p>

        <p style="font-size: 11px;">Este correo es confidencial. Si lo ha recibido por error, por favor notifíquenos y elimínelo de inmediato.</p>
      </div>
      `,
    });

    const sendEmailInterno = await transporter.sendMail({
      from: '"Notificaciones Jorge Cartuchos" <jorgelo1469@gmail.com',
      to: "jorgelo1469@gmail.com",
      subject: `Nueva solicitud de ${nombre}`,
      html: `
        <p>Se ha recibido una nueva solicitud de contacto:</p>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo electrónico:</strong> ${correo}</p>
        <p><strong>Asunto:</strong> ${asunto}</p>
        <p><strong>Mensaje:</strong> ${mensaje}</p>
        ${
          activarCarrito
            ? `
          <h3>Productos solicitados:</h3>
          <ul>
            ${carrito
              .map(
                (producto) => `
              <li>
                <strong>${producto.nombre}</strong><br/>
                Info: ${producto.info}<br />
                id: ${producto.id}
              </li>
            `
              )
              .join("")}
          </ul>
          `
            : `
            <p><strong>No se han solicitado productos.</strong></p>
        `
        }
        <p>Revisa esta solicitud y responde al cliente lo antes posible.</p>
        <p>Atentamente,</p>
        <p><strong>Jorge Cartuchos</strong></p>
      `,
    });

    console.log("Mensaje enviado a: %s", sendEmail.messageId);
    console.log("Mensaje enviado al cliente: %s", sendEmailInterno.messageId);
    return sendEmail, sendEmailInterno;
  } catch (error) {
    console.log("Error al enviar los correos: ", error);
    throw error;
  }
};
