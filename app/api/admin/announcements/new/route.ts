import { AnnoucmentData } from "../../../../../types/index";
import { db } from "../../../../db/index";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import _ from "lodash";

export const POST = async (req: Request) => {
    try {
        const formData = await req.formData();

        const title = formData.get('title') as string;
        const salary = formData.get('salary') as string;
        const image = formData.get('image') as File || null;
        const video = formData.get('video') as File || null;
        const description = formData.get('description') as string;
        let location = "ul.Mostowa 36, 87-100 Toruń" as string;

        //Image Prepare And Upload
        const buffer = Buffer.from(await image.arrayBuffer());
        const relativeUploadDir = `/uploads/annoucements/${new Date(Date.now())
        .toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
         })
        .replace(/\//g, "-")}`;

        const uploadDir = join(process.cwd(), "public", relativeUploadDir);

        try {
            await stat(uploadDir);
        } catch (e: any) {
            // This is for checking the directory is exist (ENOENT : Error No Entry)
            if (e.code === "ENOENT") await mkdir(uploadDir, { recursive: true }); 
        } 

        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const filename = `${image.name.replace(
            /\.[^/.]+$/,
            ""
        )}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
        await writeFile(`${uploadDir}/${filename}`, buffer);
        const fileUrl = `${relativeUploadDir}/${filename}`;
        //END of uploading file and got a link

        const annoucmentData: AnnoucmentData = {
            title,
            salary,
            image: fileUrl,
            video: '',
            description,
            location,
        }
        console.log(annoucmentData)
        await db.annoucment.create({
            data: annoucmentData
        })

        return Response.redirect(`${process.env.NEXTAUTH_URL}/admin/announcements`);
    } catch (error) {
        console.log('Errors: ',error);
        return new Response(JSON.stringify({message: 'error'}), {status: 500});
    }
}