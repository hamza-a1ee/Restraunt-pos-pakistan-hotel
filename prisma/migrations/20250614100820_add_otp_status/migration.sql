-- CreateEnum
CREATE TYPE "OtpStatus" AS ENUM ('UNVERIFIED', 'VERIFIED', 'USED');

-- AlterTable
ALTER TABLE "Otp" ADD COLUMN     "status" "OtpStatus" NOT NULL DEFAULT 'UNVERIFIED';
