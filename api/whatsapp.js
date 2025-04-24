const twilio = require("twilio");

module.exports = (req, res) => {
  console.log("--- Nueva Solicitud Recibida ---");
  console.log("Headers:", JSON.stringify(req.headers));
  console.log("Cuerpo de la Solicitud:", JSON.stringify(req.body));

  const incomingMsg = req.body?.Body?.trim() || "";
  const twiml = new twilio.twiml.MessagingResponse();

  console.log("Mensaje Entrante:", incomingMsg);

  const lowerMsg = incomingMsg.toLowerCase();

  if (["hola", "buenas", "hey", "hi"].includes(lowerMsg)) {
    console.log("Respondiendo con saludo.");
    twiml.message(
      `👋 ¡Hola! Soy *Nomi*, tu asistente virtual 🤖🌟\n\nEstoy aquí para ayudarte con temas de bienestar laboral y Recursos Humanos.\n\nResponde con el número de la opción que necesites:\n\n1️⃣ - 📋 Contestar encuesta *NOM-035*\n2️⃣ - 🧠 Realizar evaluación de desempeño\n3️⃣ - 👩‍💼 Contactar a una persona de Recursos Humanos\n4️⃣ - ⏰ Consultar horarios y tiempos de respuesta`
    );
  } else if (incomingMsg === "1") {
    console.log("Opción 1 seleccionada: Preguntando número de colaboradores.");
    twiml.message(`✍️ ¿Cuántos colaboradores hay en tu centro de trabajo?\n\nResponde con un número.`);
  } else if (!isNaN(incomingMsg) && Number(incomingMsg) > 0) {
    const num = Number(incomingMsg);
    console.log("Número de colaboradores recibido:", num);
    if (num < 15) {
      twiml.message(`🔍 Aplica solo la *Guía I*.\n🔗 Contestar Guía I`);
    } else if (num <= 50) {
      twiml.message(`🔍 Aplica *Guías I, II y V*.\n🔗 Contestar Guía I\n🔗 Contestar Guía II (46 preguntas)`);
    } else {
      twiml.message(`🔍 Aplica *Guías I, III y V*.\n🔗 Contestar Guía I\n🔗 Contestar Guía III (72 preguntas)`);
    }
  } else if (incomingMsg === "2") {
    console.log("Opción 2 seleccionada: Solicitando puesto para evaluación.");
    twiml.message(
      `Selecciona el puesto que deseas evaluar:\n🔑 Ama de llaves\n🔧 Mantenimiento\n👨‍🍳 Cocinero\n🧺 Lavandería\n⏱️ Checador\n🛎️ Recepcionista\n🛠️ Ayudante general\n💼 Recursos Humanos`
    );
  } else if (
    [
      "ama de llaves",
      "mantenimiento",
      "cocinero",
      "lavandería",
      "checador",
      "recepcionista",
      "ayudante general",
      "recursos humanos",
    ].includes(lowerMsg)
  ) {
    console.log("Puesto para evaluación recibido:", incomingMsg);
    twiml.message(
      `✉️ Por favor, llena el siguiente formulario:\nEvaluación para *${incomingMsg}*\nIncluye:\n- Nombre completo por apellido\n- Puesto\n- Antigüedad`
    );
  } else if (incomingMsg === "3") {
    console.log("Opción 3 seleccionada: Contactar R.H.");
    twiml.message(
      `📧 En breve, alguien de R.H. se pondrá en contacto contigo.\n\n🕒 Horario: Lunes a Viernes de 8:00 a.m. a 5:00 p.m.`
    );
  } else if (incomingMsg === "4") {
    console.log("Opción 4 seleccionada: Consultar horarios.");
    twiml.message(
      `⏰ Horario de atención:\nLunes a Viernes de 8:00 a.m. a 5:00 p.m.\n📨 Si escribes fuera de este horario, te responderemos el siguiente día hábil.\n\n🏥 Cumplamos juntos la *NOM-035*`
    );
  } else {
    console.log("Opción no reconocida:", incomingMsg);
    twiml.message(`❓ Opción no reconocida. Por favor responde con una opción del 1 al 4.`);
  }

  res.setHeader("Content-Type", "text/xml");
  console.log("Respuesta TwiML:", twiml.toString());
  res.status(200).send(twiml.toString());
  console.log("--- Solicitud Procesada y Respuesta Enviada ---");
};