import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
    const { email, link } = await req.json();

    // Define mail options with a proper structured email format
    const mailOptions = {
        from: 'support@yourdomain.com', // Replace with your support or official email
        to: email,
        subject: 'Your Secure Encrypted Link - Cybenty',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h2 style="color: #4CAF50;">Your Encrypted Secret Link</h2>
                <p>Dear ${email},</p>
                <p>You have requested a secure link to access your secret. You can use the following encrypted link, which can only be viewed once. Please do not share it with others:</p>
                <p><a href="${link}" style="color: #2C6BED; word-break: break-all;">${link}</a></p>
                <p><b>Note:</b> This link will expire after it has been accessed.</p>
                <br/>
                <p>If you did not request this link, please disregard this email or contact our support team.</p>
                <br/>
                <p>Best Regards,<br/>The Cybenty Team</p>
                <hr/>
                <p style="font-size: 12px; color: #999;">This is an automated email, please do not reply to this message.</p>
            </div>
        `,
    };

    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'huma9016@gmail.com', // Your email
                pass: 'rbfc gkcb khht vycl', // Your app password
            },
        });

        // Send email and capture the result
        const info = await transporter.sendMail(mailOptions);

        // Check if the email was successfully sent
        return NextResponse.json({ status: 'sent', message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error while sending email:', error);
        return NextResponse.json(
            { message: 'Internal Server Error', error, isSuccess: false },
            { status: 500 }
        );
    }
}
