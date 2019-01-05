const config = require('../config/constants');
const previewEmail = require('preview-email');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    jsonTransport: true
});

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

exports.sendVerificationToken = (verificationObj, callback) => {
    // Create a verification token for this user
    let HTML = "<p>Your verification token : <b>" + verificationObj.token + "<b></p>";

    const mailOptions = {
        to: verificationObj.email,
        from: process.env.ACC_SENDGRID_EMAIL,
        subject: process.env.ACC_VERIFICATION,
        text: 'Radotator verification token',
        html: HTML
    };
    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, 'A verification email has been sent to ' + verificationObj.email + '.');
        }
    });
}
