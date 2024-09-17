import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
//import EmailProvider from "next-auth/providers/email";

import { db } from "../../../db/index";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // CredentialsProvider({
    //   // The name to display on the sign in form (e.g. "Sign in with...")
    //   name: "Credentials",
    //   // `credentials` is used to generate a form on the sign in page.
    //   // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   // You can pass any HTML attribute to the <input> tag through the object.
    //   credentials: {
    //     email: {
    //       label: "Email",
    //       type: "text",
    //       placeholder: "example@email.com",
    //     },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     const userExists = await db.user.findUnique({
    //       where: {
    //         email: credentials?.email,
    //       },
    //     });
    //     console.log("userExist", userExists);

    //     if (userExists) {
    //       //Check Password
    //       const matched = bcrypt.compare(
    //         credentials?.password,
    //         userExists.password
    //       );

    //       if (matched) {
    //         return userExists;
    //       } else {
    //         return null;
    //       }
    //     } else {
    //       // If you return null then an error will be displayed advising the user to check their details.
    //       return null;

    //       // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
    //     }
    //   },
    // }),
  ],
  callbacks: {
    async session({ session }) {
      console.log("SESSSION", session);
      const sessionUser = await db.user.findUnique({
        where: {
          email: session.user.email,
        },
        select: {
          id: true,
          role: true,
        },
      });
      console.log("SESSION USER DB", sessionUser);
      session.user.id = sessionUser.id.toString();
      session.user.role = sessionUser.role;
      console.log(session.user);
      return session;
    },
    async signIn({ profile }) {
      console.log("profilep", profile);
      try {
        //check if user already exists
        const userExists = await db.user.findUnique({
          where: {
            email: profile.email,
          },
        });
        console.log("userExist", userExists);

        //if not create user
        if (!userExists) {
          console.log("user not exist-------");
          const newUser = {
            firstName: profile?.given_name,
            lastName: profile?.family_name,
            email: profile?.email,
            emailVerified: Boolean(profile?.email_verified),
            role: "user",
            profileImageUrl: profile?.picture,
          };
          await db.user.create({
            data: newUser,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
