const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

async function sendWelcomeEmail(name, email) {
    await transporter.sendMail({
        from: `"LuxeNest" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Welcome to LuxeNest",

        text: `Hello ${name},

            Welcome to LuxeNest!

            Thank you for creating your account with us.

            You can now explore properties, view property details and send inquiries through our platform.

            Thank you for choosing LuxeNest.

            LuxeNest Team`,

        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px;">

                <h1>Welcome to LuxeNest</h1>

                <p>Hello ${name},</p>

                <p>
                    Thank you for creating your LuxeNest account.
                </p>

                <p>
                    You can now explore properties, view property
                    details and send inquiries through our platform.
                </p>

                <p>
                    Thank you for choosing LuxeNest.
                </p>

                <p>
                    <strong>LuxeNest Team</strong>
                </p>

            </div>
        `
    });
} 

module.exports = sendWelcomeEmail;