import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
    const { imgSrc, email } = await req.json();

    let mailOptions;
    const localUrl = 'http://localhost:3000'
    const vercelUrl = 'https://cyber-security-frontend-zysoftec.vercel.app'
    const LiveUrl = 'https://cybenty.com'

    mailOptions = {
        from: `huma9016@gmail.com`,
        to: `${email}`,
        subject: 'Cybenty',
        html: `
  <p>Click the button below to download the image as a PDF.</p>
  <a href="${vercelUrl}/download?imgUrl=${encodeURIComponent(imgSrc)}" 
     style="background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block;">
     Download PDF
  </a>
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
                console.log("Image sent:", info.messageId);
                isSent = true;
            })
            .catch((error) => {
                console.log("Image not sent:", error);
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