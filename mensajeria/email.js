const nodemailer = require("nodemailer");

const confEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "anamolina.r08@gmail.com",
    pass: "yhan xvzr psqe lhec",
  },
});

const sendEmail = async (to) => {
  try {
    const mailFormat = {
      from: "anamolina.r08@gmail.com",
      to: to,
      subject: "Gracias por la registración",
      html: `
          <h1>Gracias por haberte registrado en nuestra app Code Space</h1>
          <p>Bienvenido a la comunidad de Code Space! Estamos muy contentos de que te hayas unido a nosotros. 
          A partir de ahora, podrás disfrutar de todas las funcionalidades y beneficios que nuestra app tiene para ti.</p>
          <p>Si no te registraste, por favor ignora este correo.</p>
        `,
    };

    await confEmail.sendMail(mailFormat);
  } catch (error) {
    console.log("Error al enviar el mail:", error.message);
  }
};

module.exports = { sendEmail };
