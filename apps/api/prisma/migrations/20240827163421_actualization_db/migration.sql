/*
  Warnings:

  - You are about to drop the column `sould_attatch_user_by_domain` on the `organizations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "organizations" DROP COLUMN "sould_attatch_user_by_domain",
ADD COLUMN     "sould_attach_user_by_domain" BOOLEAN NOT NULL DEFAULT false;
