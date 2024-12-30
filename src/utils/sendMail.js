import resend from "../configs/resend.js";
// import { EMAIL_SENDER, NODE_ENV } from "../constants/env.js";
import "dotenv/config";

const getFromEmail = () =>
  process.env.NODE_ENV === "development" ? "onboarding@resend.dev" : process.env.EMAIL_SENDER;

const getToEmail = (to) =>
  process.env.NODE_ENV === "development" ? "delivered@resend.dev" : to;

export const sendMail = async ({ to, subject, text, html }) =>
  await resend.emails.send({
    from: getFromEmail(),
    to: getToEmail(to),
    subject,
    text,
    html,
  });
