
const previewEmail = require('preview-email');
const nodemailer = require('nodemailer');

// create transporter via node mailer
const transporter = nodemailer.createTransport({
    jsonTransport: true
});

// preview mail package helps to generate a mock view of the email
exports.sendEmail = (to, from, subject, text, htmlBody) => {
    return new Promise((res, rej) => {
        // Send the email
        const message = {
            to: to,
            from: from,
            subject: subject,
            text: text,
            html: htmlBody
        };
        previewEmail(message).then(console.log).catch(console.error)
        transporter.sendMail(message).then(resp=>res(true)).catch(err=>rej(false));
    });

}


