const fs = require("fs");
const path = require("path");
const handlebar = require("handlebars");
const nodemailer = require("nodemailer");

const AVAILABLE_TEMPLATES = {
  SIGNUP: "signup",
};

class Email {
  constructor(template = "") {
    this.body = "";
    this.subject = "";
    this.cc = [];

    this.setTemplate(template);
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
    if (!this.template) {
      throw new Error("Template not set");
    }
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
    if (!email) {
      throw new Error("Email not set");
    }
    if (!this.body || !this.subject) {
      throw new Error("Body or subject not set");
    }

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
      cc: this.cc,
      subject: this.subject,
      html: this.body,
    });

    return info;
  }
}

module.exports = {
  Email,
  AVAILABLE_TEMPLATES,
};
