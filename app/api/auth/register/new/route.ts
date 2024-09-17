import { db } from "@/app/db";

export const POST = async (req: Request) => {
  try {
    const formData = await req.formData();
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const emailVerified = false;
    const password = formData.get('password') as string;
    const role = 'user';
    const profileImageUrl = formData.get('profileImageUrl') as string | "";

    //check if user already exists
    const userExists = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    //Prepare Password
    //const bcrypt = require('bcrypt');
    // const saltRounds = 10;
    // const myPlaintextPassword = password;
    // const someOtherPlaintextPassword = 'not_bacon';
    // let hashedPassword = ""

    // bcrypt.genSalt(saltRounds, function(err, salt) {
    //   bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
    //     // Store hash in your password DB.
    //     hashedPassword = 
    //   });
    // });

    //if user not exist
    if (!userExists) {
      console.log("user not exist-------");
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        emailVerified,
        password,
        role,
        profileImageUrl: profileImageUrl,
      };
      await db.user.create({
        data: newUser,
      });
    }

    //Response
    return Response.redirect(`${process.env.NEXTAUTH_URL}/`);
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "error" }), { status: 500 });
  }
};
