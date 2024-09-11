import nodemailer from "nodemailer";
// import { productos, masUsados } from "../data/productos.js";

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
      from: '"Jorge Cartuchos" <contacto.jorgecartuchos@gmail.com>',
      to: correo,
      subject: "Solicitud recibida",
      text: `Hola ${nombre},

      ¡Gracias por ponerte en contacto conmigo! He recibido tu solicitud correctamente y la estoy revisando para ofrecerte la mejor asistencia posible. Te contactaré en breve con más detalles.

      Si tienes alguna pregunta adicional mientras tanto, no dudes en responder a este correo o llamarme directamente.

      Gracias por tu paciencia y confianza en Jorge Cartuchos.

      Saludos cordiales,
      Jorge Cartuchos

      ---

      Teléfono: +57 (320) 568 2187
      Correo Electrónico: contacto.jorgecartuchos@gmail.com
      Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos a través de este correo, enviar un mensaje por WhatsApp, o visitar nuestra Política de Devoluciones en http://localhost:5173/devoluciones.

      Este correo es confidencial. Si lo ha recibido por error, por favor notifíquenos y elimínelo de inmediato.
      `,
      html: `
      <p>Hola ${nombre},</p>
      <p>¡Gracias por ponerte en contacto conmigo! He recibido tu solicitud correctamente y la estoy revisando para ofrecerte la mejor asistencia posible. Te contactaré en breve con más detalles.</p>
      <p>Si tienes alguna pregunta adicional mientras tanto, no dudes en responder a este correo o llamarme directamente.</p>
      <p>Gracias por tu paciencia y confianza en Jorge Cartuchos.</p>
      <p>Saludos cordiales,</p>
      <p><strong>Jorge Cartuchos</strong></p>
      <a href="http://localhost:5173/" target="_blank">
        <img src="https://drive.usercontent.google.com/download?id=1EJxbYEEz0_wk8D8AWETQ-OgeJQlEfKiR&authuser=0" alt="Firma Jorge Cartuchos" style="width: 720px; height: auto;" />
      </a>
      <div style="font-family: Arial, sans-serif; font-size: 14px; color: #333; margin-top: 20px;">
      
        <a style="display: inline-block; margin-right: 5px;" href="https://www.facebook.com/profile.php?id=100067410135870"><img src="https://drive.google.com/uc?export=view&id=1uExLlo6JM9-e8DHVAf3d7pnYbzio0rSj"/></a>

        <a style="display: inline-block;" href="https://api.whatsapp.com/send/?phone=573205682187&text=Hola+Jorge+Cartuchos%2C+me+interesa+un+cartucho&type=phone_number&app_absent=0"><img src="https://drive.google.com/uc?export=view&id=1b52O3Lh_oz6DK_hyZOiNAkdd89ZjZyf0"/></a>

        <h4 style="margin: 0; font-size: 16px; color: #000; margin-top: 10px;">Contacto</h4>
        <p style="margin: 5px 0;">Teléfono: +57 (320) 568 2187</p>
        <p style="margin: 5px 0;">Correo Electrónico: <a href="mailto:contacto.jorgecartuchos@gmail.com" style="color: #007BFF;">contacto.jorgecartuchos@gmail.com</a></p>
        <p style="font-size: 11px;">Si tienes alguna pregunta o necesitas más información, no dudes en contactarnos a través de este correo, enviar un mensaje por WhatsApp, o visitar nuestra <a href="http://localhost:5173/devoluciones" target="_blank" style="color: #007BFF;">Política de Devoluciones</a>.</p>

        <p style="font-size: 11px;">Este correo es confidencial. Si lo ha recibido por error, por favor notifíquenos y elimínelo de inmediato.</p>
      </div>
      `,
    });

    const sendEmailInterno = await transporter.sendMail({
      from: '"Notificaciones Jorge Cartuchos" <contacto.jorgecartuchos@gmail.com',
      to: "contacto.jorgecartuchos@gmail.com",
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
