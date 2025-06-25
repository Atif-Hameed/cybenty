import { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRECT, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, LINKEDIN_CLIENT_ID, LINKEDIN_CLIENT_SECRECT, NEXTAUTH_SECRET } from "@/utils/Constant";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import LinkedInProvider from "next-auth/providers/linkedin";



const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        }),
        FacebookProvider({
            clientId: FACEBOOK_CLIENT_ID,
            clientSecret: FACEBOOK_CLIENT_SECRECT,
        }),
        LinkedInProvider({
            clientId: LINKEDIN_CLIENT_ID,
            clientSecret: LINKEDIN_CLIENT_SECRECT,
            authorization: {
                params: {
                    redirect_uri: `https://cyber-security-frontend-zysoftec.vercel.app/api/auth/callback/linkedin`,
                    scope: "r_liteprofile r_emailaddress",
                },
            },
        }),
    ],
    secret: NEXTAUTH_SECRET,
    callbacks: {
        async redirect({ url, baseUrl }) {
            // Redirect to dashboard after login
            return baseUrl + "/dashboard";
        },
        async session({ session, token }) {
            // Add user ID or other info to the session
            session.user.id = token.sub; // token.sub typically contains the user's ID
            return session;
        },
        async signIn({ user, account, profile }) {
            // Handle the OAuth callback
            console.log(user)
            // try {
            //     console.log(user)
            //     const { name, email } = user;

            //     // Check if the user exists in your database (you can make a request here if necessary)

            //     // Register the user through your existing userRegister API if they are new
            //     await userRegister(name, email);

            //     return true; // If the user was successfully registered or already exists
            // } catch (error) {
            //     console.error('Error during social login registration:', error);
            //     return false; // Return false to deny access
            // }
        }
    }
});

export const GET = handler;
export const POST = handler;
