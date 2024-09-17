import { db } from "../../../../db/index";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { ImportantDocumentsData } from "@/types";

export const POST = async (req: Request) => {
    try {
        const formData = await req.formData();

        const document = formData.get('document') as File || null;

        //Image Prepare And Upload
        const buffer = Buffer.from(await document.arrayBuffer());
        const relativeUploadDir = `/uploads/importantdocs/${new Date(Date.now())
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
        const filename = `${document.name.replace(
            /\.[^/.]+$/,
            ""
        )}-${uniqueSuffix}.${mime.getExtension(document.type)}`;
        await writeFile(`${uploadDir}/${filename}`, buffer);
        const fileUrl = `${relativeUploadDir}/${filename}`;
        //END of uploading file and got a link

        //Prepare Date
        const newDateTime = new Date();

        //Prepare Object
        const importantdocumentsData: ImportantDocumentsData = {
            createdAt: newDateTime.toISOString(),
            updatedAt: newDateTime.toISOString(),
            documentTitle: `${document.name.replace(
                /\.[^/.]+$/,
                ""
            )}`,
            documentUrl: fileUrl,
            documentType: "fdp",
        }

        //Save in DB
        await db.importantDocuments.create({
            data: importantdocumentsData
        })

        return Response.redirect(`${process.env.NEXTAUTH_URL}/admin/importantdocuments`);
    } catch (error) {
        console.log('Errors: ',error);
        return new Response(JSON.stringify({message: 'error'}), {status: 500});
    }
}