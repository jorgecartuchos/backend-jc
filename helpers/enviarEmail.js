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
      cc: 'contacto.jorgecartuchos@gmail.com',
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
      Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos a través de este correo, enviar un mensaje por WhatsApp, o visitar nuestra Política de Devoluciones en https://jorgecartuchos.vercel.app/devoluciones.

      Este correo es confidencial. Si lo ha recibido por error, por favor notifíquenos y elimínelo de inmediato.
      `,
      html: `
      <p>Hola ${nombre},</p>
      <p>¡Gracias por contactarte con Jorge Cartuchos! He recibido tu solicitud correctamente y la estoy revisando para ofrecerte la mejor asistencia posible. Te contactaré en breve con más detalles.</p>
      <p>Si tienes alguna pregunta adicional mientras tanto, no dudes en responder a este correo o <a href="tel:+573205682187">llamarme directamente al +57 320 568 2187</a>.
      </p>

      <p>Gracias por tu paciencia y confianza en Jorge Cartuchos.</p>
      <p>Saludos cordiales,</p>
      <p><strong>Jorge López</strong></p>
      <a href="https://jorgecartuchos.vercel.app/" target="_blank">
        <img
          src="https://drive.usercontent.google.com/download?id=19Bzc8wLzkwbSaxRDHJUJ_pUiO2kjPeTN&export=view&authuser=0"
          alt="Firma Jorge Cartuchos"
          width="720"
          style="width:100%; max-width:720px; height:auto; display:block;"
        />
      </a>
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; margin-top: 20px;">
      
        <h4 style="margin: 0; font-size: 16px; color: #000; margin-top: 10px;">Contacto</h4>
        <p style="margin: 5px 0;">Teléfono: <a href="tel:+573205682187">+57 320 568 2187</a></p>
        <p style="margin: 5px 0;">Correo Electrónico: <a href="mailto:jorgelo1469@jorgelo1469@gmail.com</a></p>
        <p style="font-size: 11px;">Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos a través de este correo, enviar un mensaje por WhatsApp, o visitar nuestra <a href="https://jorgecartuchos.vercel.app/devoluciones" target="_blank" style="color: #007BFF;">Política de Devoluciones</a>.</p>

        <p style="font-size: 11px;">Este correo es confidencial. Si lo ha recibido por error, por favor notifíquenos y elimínelo de inmediato.</p>
      </div>
      `,
    });

    const sendEmailInterno = await transporter.sendMail({
      from: '"Notificaciones Jorge Cartuchos" <jorgelo1469@gmail.com',
      to: 'jorgelo1469@gmail.com',
      cc: 'contacto.jorgecartuchos@gmail.com',
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
