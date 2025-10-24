/*
  Warnings:

  - The values [WEEKLY,BIWEEKLY] on the enum `CycleDuration` will be removed. If these variants are still used in the database, this will fail.
  - The values [PRIVATE_TO_AUTHOR,VISIBLE_TO_GROUP] on the enum `NotesPrivacy` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."CycleDuration_new" AS ENUM ('MONTHLY', 'QUARTERLY', 'CUSTOM');
ALTER TABLE "public"."Group" ALTER COLUMN "cycleDuration" DROP DEFAULT;
ALTER TABLE "public"."Group" ALTER COLUMN "cycleDuration" TYPE "public"."CycleDuration_new" USING ("cycleDuration"::text::"public"."CycleDuration_new");
ALTER TYPE "public"."CycleDuration" RENAME TO "CycleDuration_old";
ALTER TYPE "public"."CycleDuration_new" RENAME TO "CycleDuration";
DROP TYPE "public"."CycleDuration_old";
ALTER TABLE "public"."Group" ALTER COLUMN "cycleDuration" SET DEFAULT 'MONTHLY';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "public"."NotesPrivacy_new" AS ENUM ('PUBLIC', 'MEMBER_AND_ADMIN', 'ADMIN_ONLY');
ALTER TABLE "public"."Group" ALTER COLUMN "notesPrivacy" DROP DEFAULT;
ALTER TABLE "public"."Group" ALTER COLUMN "notesPrivacy" TYPE "public"."NotesPrivacy_new" USING ("notesPrivacy"::text::"public"."NotesPrivacy_new");
ALTER TYPE "public"."NotesPrivacy" RENAME TO "NotesPrivacy_old";
ALTER TYPE "public"."NotesPrivacy_new" RENAME TO "NotesPrivacy";
DROP TYPE "public"."NotesPrivacy_old";
ALTER TABLE "public"."Group" ALTER COLUMN "notesPrivacy" SET DEFAULT 'MEMBER_AND_ADMIN';
COMMIT;

-- AlterTable
ALTER TABLE "public"."Group" ALTER COLUMN "notesPrivacy" SET DEFAULT 'MEMBER_AND_ADMIN',
ALTER COLUMN "cycleDuration" SET DEFAULT 'MONTHLY';
