'use server';

import { has } from 'lodash';
import { db } from '../db/index';
import { redirect } from 'next/navigation';
import { Documents } from '@prisma/client';

export async function annoucmentEdit(formData: FormData) {
    const id = parseInt(formData.get('id') as string);
    const title = formData.get('title') as string;
    const salary = formData.get('salary') as string;
    const image = formData.get('image') as File | null;
    const video = formData.get('video') as File | null;
    const description = formData.get('description') as string;
    const location = "ul.Mostowa 36, 87-100 Toruń" as string;

    //Use values to fix error
    const myImage = image;
    const myVideo = video

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
            image: '',
            video: '',
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

export async function registerUser(formData: any) {
    try {

        const {
            firstName,
            lastName,
            email,
            password,
            confirmedPassword,
        } = formData;


        if(password === confirmedPassword){
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
        const save = await db.aplicationData.create({
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