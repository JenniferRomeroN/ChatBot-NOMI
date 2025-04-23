require("dotenv").config();
const express = require("express");
const app = express();
const twilio = require("twilio");

app.use(express.urlencoded({ extended: false }));

app.post("/whatsapp", (req, res) => {
    const incomingMsg = req.body.Body.trim();
    const twiml = new twilio.twiml.MessagingResponse();

    const lowerMsg = incomingMsg.toLowerCase();

if (["hola", "buenas", "hey", "hi"].includes(lowerMsg)) {
    twiml.message(
    `👋 ¡Hola! Soy *Nomi*, tu asistente virtual 🤖🌟\n\nEstoy aquí para ayudarte con temas de bienestar laboral y Recursos Humanos.\n\nResponde con el número de la opción que necesites:\n\n1️⃣ - 📋 Contestar encuesta *NOM-035*\n2️⃣ - 🧠 Realizar evaluación de desempeño\n3️⃣ - 👩‍💼 Contactar a una persona de Recursos Humanos\n4️⃣ - ⏰ Consultar horarios y tiempos de respuesta`
    );
} else if (incomingMsg === "1") {
    twiml.message(
    `✍️ ¿Cuántos colaboradores hay en tu centro de trabajo?\n\nResponde con un número.`
    );
} else if (!isNaN(incomingMsg) && Number(incomingMsg) > 0) {
    const num = Number(incomingMsg);
    if (num < 15) {
    twiml.message(`🔍 Aplica solo la *Guía I*.\n🔗 Contestar Guía I`);
    } else if (num <= 50) {
    twiml.message(
        `🔍 Aplica *Guías I, II y V*.\n🔗 Contestar Guía I\n🔗 Contestar Guía II (46 preguntas)`
    );
    } else {
    twiml.message(
        `🔍 Aplica *Guías I, III y V*.\n🔗 Contestar Guía I\n🔗 Contestar Guía III (72 preguntas)`
    );
    }
} else if (incomingMsg === "2") {
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
    twiml.message(
    `✉️ Por favor, llena el siguiente formulario:\nEvaluación para *${incomingMsg}*\nIncluye:\n- Nombre completo por apellido\n- Puesto\n- Antigüedad`
    );
} else if (incomingMsg === "3") {
    twiml.message(
    `📧 En breve, alguien de R.H. se pondrá en contacto contigo.\n\n🕒 Horario: Lunes a Viernes de 8:00 a.m. a 5:00 p.m.`
    );
} else if (incomingMsg === "4") {
    twiml.message(
    `⏰ Horario de atención:\nLunes a Viernes de 8:00 a.m. a 5:00 p.m.\n📨 Si escribes fuera de este horario, te responderemos el siguiente día hábil.\n\n🏥 Cumplamos juntos la *NOM-035*`
    );
} else {
    twiml.message(
    `❓ Opción no reconocida. Por favor responde con una opción del 1 al 4.`
    );
}

res.writeHead(200, { "Content-Type": "text/xml" });
res.end(twiml.toString());
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Bot activo en http://localhost:${port}`));
