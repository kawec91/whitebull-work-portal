'use server';

import { db } from '../db/index';
import { redirect } from 'next/navigation';
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";




export async function annoucmentEdit(formData: FormData) {
    const id = parseInt(formData.get('id') as string);
    const title = formData.get('title') as string;
    const salary = formData.get('salary') as string;
    const image = formData.get('image') as File || null;
    // const video = formData.get('video') as File || null;
    const description = formData.get('description') as string;
    const location = "ul.Mostowa 36, 87-100 Toruń" as string;

    //Image Prepare And Upload
    const buffer = Buffer.from(await image.arrayBuffer());
    const relativeUploadDir = `/uploads/documents/${new Date(Date.now())
    .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
     })
    .replace(/\//g, "-")}`;

    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    try {
        await stat(uploadDir);
    } catch (e) {
        if ((e as NodeJS.ErrnoException).code === "ENOENT") {
            await mkdir(uploadDir, { recursive: true });
        }
        console.log((e as Error).message);
    } 

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${image.name.replace(
        /\.[^/.]+$/,
        ""
    )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    const fileUrl = `${relativeUploadDir}/${filename}`;
    //END of uploading file and got a link

    await db.annoucment.findUnique({
        where: {
            id: id,
        }
    });

    await db.annoucment.update({
        where: {
            id: id,
        },
        data: {
            title,
            salary,
            image: fileUrl,
            video: "",
            description,
            location,
        }
    });

    redirect('/admin/announcements');
}

export async function annoucementDelete(ogloszenieId: number) {
    //Delete File
    //Delete Annoucement from db
    await db.annoucment.delete({
        where: {
            id: ogloszenieId,
        }
    })

    redirect('/admin/announcements');
}

export async function importantDocumentDelete(importantDocId: number) {
    //Delete File
    //TODO
    //Delete Annoucement from db
    await db.importantDocuments.delete({
        where: {
            id: importantDocId,
        }
    })

    redirect('/admin/importantdocuments');
}

interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export async function registerUser(formData: RegisterFormData) {
    try {

        const {
            firstName,
            lastName,
            email,
            password,
        } = formData;


        if(password){
        //check if user already exists
        const userExists = await db.user.findUnique({
            where: {
            email: email,
            },
        });
        // Prepare password
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);

        //if user not exist
        if (!userExists) {
            console.log("user not exist-------");
            const newUser = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                //password: hashedPassword,
                password,
                emailVerified: false,
                role: "user",
                profileImageUrl: "",
            };
            //Create user in db
            await db.user.create({
            data: newUser,
            });}
        }

        //Response
        return Response.redirect(`${process.env.NEXTAUTH_URL}/`);
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: "error" }), { status: 500 });
    }
}


export async function createAplication(myUserEmail: string){
    
    try {
        //Get Docs whith specyfic email and type
        const userDoc = await db.documents.findMany({
            where: {
                userEmail: myUserEmail,
                documentType: "cv"
            }
        })
        //Save into db
        await db.aplicationData.create({
            data: {
                annoucmentTitle: "",
                userEmail: myUserEmail,
                userProfileImageUrl: "",
                userCvUrl: userDoc[0].documentUrl,
            }
        });
        //Response
        return Response.redirect(`${process.env.NEXTAUTH_URL}/`);
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: "error" }), { status: 500 });
    }
}

export async function aplicationDelete(aplicationId: number) {
    //Delete File
    //TODO
    //Delete Annoucement from db
    await db.aplicationData.delete({
        where: {
            id: aplicationId,
        }
    })

    redirect('/admin/aplication');
}

export async function userDocumentDelete(itemId: number) {
    //Delete file
    //TODO
    await db.documents.delete({
        where: {
            id: itemId
        }
    })
    //Redirect
    redirect('/profile');
}