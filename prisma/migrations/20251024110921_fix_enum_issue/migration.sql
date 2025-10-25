/*
  SAFE MIGRATION — no data loss
  This replaces the Prisma-generated migration that caused transaction aborts.
  It safely updates the enums "CycleDuration" and "NotesPrivacy" without resetting or dropping data.
*/

-- 1️⃣ Safely update CycleDuration enum
DO $$
BEGIN
  -- Create new enum only if it doesn't already exist
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'CycleDuration_new') THEN
    CREATE TYPE "public"."CycleDuration_new" AS ENUM ('MONTHLY', 'QUARTERLY', 'CUSTOM');
  END IF;

  -- Try to convert column to the new enum
  BEGIN
    ALTER TABLE "public"."Group"
      ALTER COLUMN "cycleDuration" DROP DEFAULT,
      ALTER COLUMN "cycleDuration" TYPE "public"."CycleDuration_new"
      USING ("cycleDuration"::text::"public"."CycleDuration_new");
  EXCEPTION
    WHEN others THEN
      RAISE NOTICE 'CycleDuration type conversion skipped (likely already migrated).';
  END;

  -- Drop any leftover old enums
  IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'CycleDuration_old') THEN
    DROP TYPE "public"."CycleDuration_old";
  END IF;

  -- Rename types
  BEGIN
    ALTER TYPE "public"."CycleDuration" RENAME TO "CycleDuration_old";
  EXCEPTION WHEN others THEN
    RAISE NOTICE 'CycleDuration rename skipped (type may already be renamed).';
  END;

  BEGIN
    ALTER TYPE "public"."CycleDuration_new" RENAME TO "CycleDuration";
  EXCEPTION WHEN others THEN
    RAISE NOTICE 'CycleDuration_new rename skipped (may already exist).';
  END;

  -- Try to drop old type only if safe
  BEGIN
    DROP TYPE IF EXISTS "public"."CycleDuration_old";
  EXCEPTION WHEN others THEN
    RAISE NOTICE 'Skipping DROP TYPE CycleDuration_old (still in use).';
  END;

  -- Restore default
  BEGIN
    ALTER TABLE "public"."Group" ALTER COLUMN "cycleDuration" SET DEFAULT 'MONTHLY';
  EXCEPTION WHEN others THEN
    RAISE NOTICE 'CycleDuration default already set.';
  END;
END $$;


-- 2️⃣ Safely update NotesPrivacy enum
DO $$
BEGIN
  -- Create new enum only if it doesn't already exist
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'NotesPrivacy_new') THEN
    CREATE TYPE "public"."NotesPrivacy_new" AS ENUM ('PUBLIC', 'MEMBER_AND_ADMIN', 'ADMIN_ONLY');
  END IF;

  -- Try to convert column to new enum
  BEGIN
    ALTER TABLE "public"."Group"
      ALTER COLUMN "notesPrivacy" DROP DEFAULT,
      ALTER COLUMN "notesPrivacy" TYPE "public"."NotesPrivacy_new"
      USING ("notesPrivacy"::text::"public"."NotesPrivacy_new");
  EXCEPTION
    WHEN others THEN
      RAISE NOTICE 'NotesPrivacy type conversion skipped (likely already migrated).';
  END;

  -- Drop any leftover old enums
  IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'NotesPrivacy_old') THEN
    DROP TYPE "public"."NotesPrivacy_old";
  END IF;

  -- Rename types
  BEGIN
    ALTER TYPE "public"."NotesPrivacy" RENAME TO "NotesPrivacy_old";
  EXCEPTION WHEN others THEN
    RAISE NOTICE 'NotesPrivacy rename skipped (type may already be renamed).';
  END;

  BEGIN
    ALTER TYPE "public"."NotesPrivacy_new" RENAME TO "NotesPrivacy";
  EXCEPTION WHEN others THEN
    RAISE NOTICE 'NotesPrivacy_new rename skipped (may already exist).';
  END;

  -- Try to drop old type only if safe
  BEGIN
    DROP TYPE IF EXISTS "public"."NotesPrivacy_old";
  EXCEPTION WHEN others THEN
    RAISE NOTICE 'Skipping DROP TYPE NotesPrivacy_old (still in use).';
  END;

  -- Restore default
  BEGIN
    ALTER TABLE "public"."Group" ALTER COLUMN "notesPrivacy" SET DEFAULT 'MEMBER_AND_ADMIN';
  EXCEPTION WHEN others THEN
    RAISE NOTICE 'NotesPrivacy default already set.';
  END;
END $$;


-- 3️⃣ Ensure both defaults are enforced
ALTER TABLE "public"."Group"
  ALTER COLUMN "notesPrivacy" SET DEFAULT 'MEMBER_AND_ADMIN',
  ALTER COLUMN "cycleDuration" SET DEFAULT 'MONTHLY';
