-- CreateEnum
CREATE TYPE "public"."Visibility" AS ENUM ('MEMBERS_CAN_SEE_GOALS', 'COACH_ONLY_SEES_GOALS');

-- CreateEnum
CREATE TYPE "public"."CycleDuration" AS ENUM ('MONTHLY', 'QUARTERLY', 'CUSTOM');

-- CreateEnum
CREATE TYPE "public"."ProgressStage" AS ENUM ('GOAL_END', 'GOAL_MID_END');

-- CreateEnum
CREATE TYPE "public"."NotesPrivacy" AS ENUM ('NOTES_VISIBLE_TO_ALL', 'NOTES_VISIBLE_TO_COACH');

-- CreateTable
CREATE TABLE "public"."Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "visibility" "public"."Visibility" NOT NULL DEFAULT 'MEMBERS_CAN_SEE_GOALS',
    "cycleDuration" "public"."CycleDuration" NOT NULL DEFAULT 'MONTHLY',
    "progressStage" "public"."ProgressStage" NOT NULL DEFAULT 'GOAL_END',
    "notesPrivacy" "public"."NotesPrivacy" NOT NULL DEFAULT 'NOTES_VISIBLE_TO_ALL',
    "coachId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GroupMember" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroupMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GroupMember_userId_groupId_key" ON "public"."GroupMember"("userId", "groupId");

-- AddForeignKey
ALTER TABLE "public"."GroupMember" ADD CONSTRAINT "GroupMember_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public"."Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
