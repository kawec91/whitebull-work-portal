import { db } from "../../../../db/index";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { DocumentData } from "@/types";

export const POST = async (req: Request) => {
    try {
        const formData = await req.formData();
        const doc = formData.get('document') as File || null;
        const docType = formData.get('documentType') as string;

        //Image Prepare And Upload
        const buffer = Buffer.from(await doc.arrayBuffer());
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
        const filename = `${doc.name.replace(
            /\.[^/.]+$/,
            ""
        )}-${uniqueSuffix}.${mime.getExtension(doc.type)}`;
        await writeFile(`${uploadDir}/${filename}`, buffer);
        const fileUrl = `${relativeUploadDir}/${filename}`;
        //END of uploading file and got a link
        //Prepare Date
        const dateTime = new Date();
        //Prepare Object to save
        const documentData: DocumentData = {
            userEmail: "lukasz.lukawczyk@gmail.com",
            createdAd: dateTime.toISOString(),
            updatedAt: dateTime.toISOString(),
            documentTitle: `${doc.name.replace(
                /\.[^/.]+$/,
                ""
            )}`,
            documentUrl: fileUrl,
            documentType: docType,
        }
        console.log(documentData);
        //DB Save
        await db.documents.create({
            data: documentData,
        })
        //Response
        return Response.redirect(`${process.env.NEXTAUTH_URL}/`);
    } catch (error) {
        console.log('Errors: ',error);
        return new Response(JSON.stringify({message: 'error'}), {status: 500});
    }
}