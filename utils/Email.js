const fs = require("fs");
const path = require("path");
const handlebar = require("handlebars");
const nodemailer = require("nodemailer");

const AVAILABLE_TEMPLATES = {
  SIGNUP: "signup",
};

class Email {
  constructor(template = "") {
    if (template) {
      this.template = template;
    }
    this.body = "";
    this.subject = "";
    this.cc = [];
  }

  setTemplate(template) {
    if (!Object.values(AVAILABLE_TEMPLATES).includes(template)) {
      throw new Error("Invalid template");
    }

    this.template = template;
    switch (template) {
      case AVAILABLE_TEMPLATES.SIGNUP:
        this.subject = "Welcome to our website";
        break;

      default:
        break;
    }
  }

  setBody(data) {
    const fileBody = fs
      .readFileSync(
        path.join(__dirname, "..", `views/templates/${this.template}.hbs`)
      )
      .toString();

    const template = handlebar.compile(fileBody);

    this.body = template(data);
  }

  setRawBody(body) {
    this.body = body;
  }

  setSubject(subject) {
    this.subject = subject;
  }

  setCC(email) {
    this.cc = email;
  }

  async send(email) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"ABC" <${process.env.EMAIL_USERNAME}>`,
      to: email,
      subject: this.subject,
      html: this.body,
    });

    console.log(info);

    return info;
  }
}

module.exports = {
  Email,
  AVAILABLE_TEMPLATES,
};
