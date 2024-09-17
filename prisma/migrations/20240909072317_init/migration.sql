/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `location` to the `Annoucment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Annoucment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "video" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL
);
INSERT INTO "new_Annoucment" ("description", "id", "image", "salary", "title", "video") SELECT "description", "id", "image", "salary", "title", "video" FROM "Annoucment";
DROP TABLE "Annoucment";
ALTER TABLE "new_Annoucment" RENAME TO "Annoucment";
CREATE UNIQUE INDEX "Annoucment_id_key" ON "Annoucment"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
