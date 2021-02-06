-- AlterTable
CREATE SEQUENCE "user_id_seq";
ALTER TABLE "User" ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq'),
ALTER COLUMN "customId" DROP NOT NULL;
ALTER SEQUENCE "user_id_seq" OWNED BY "public"."User"."id";
