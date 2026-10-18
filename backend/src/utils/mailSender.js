import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
});

const mailSender = async (email, title, body) => {
  try {
    const info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });
    // console.log("utils: ",info)

    return info;
  } catch (err) {
    console.error("Email sending error:", err.message);
    throw err;
  }
};

export { mailSender };
