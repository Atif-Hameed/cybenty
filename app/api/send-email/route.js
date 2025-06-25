import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
    const { name, address, phone, email, zipCode, projectType, message } = await req.json();

    let mailOptions;

    mailOptions = {
        from: `${email}`,
        to: 'huma9016@gmail.com',
        subject: 'Cybenty - Contact',
        html: `
                <p><b>Name:</b> ${name}</p>
                <p><b>Address:</b> ${address}</p>
                <p><b>Phone Number:</b> ${phone}</p>
                <p><b>Phone Number:</b> ${phone}</p> 
                <p><b>Email Address:</b> ${email}</p>
                <p><b>Zip Code:</b> ${zipCode}</p>
                <p><b>Type of Project:</b> ${projectType}</p>
                <p><b>Message:</b> ${message}</p>
                
            `,
    };

    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'huma9016@gmail.com',
                pass: 'rbfc gkcb khht vycl',
            },
        });

        let isSent = false;

        await transporter
            .sendMail(mailOptions)
            .then((info) => {
                console.log("Email sent:", info.messageId);
                isSent = true;
            })
            .catch((error) => {
                console.log("Email not sent:", error);
            });

        if (isSent) {
            return NextResponse.json({ status: "sent" });
        } else {
            return NextResponse.json({ status: "error" });
        }
    } catch (error) {
        return NextResponse.json(
            {
                message: `Method  Not Allowed`,
                error,
                isSuccess: false,
            },
            { status: 405 }
        );
    }
}