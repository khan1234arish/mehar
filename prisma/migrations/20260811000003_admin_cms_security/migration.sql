-- MEHAR B2B Platform — Admin CMS Security & Centralized Dynamic Settings
-- Migration: 20260811000003_admin_cms_security

-- CreateEnum
CREATE TYPE "ProductPublishStatus" AS ENUM ('DRAFT', 'PENDING_VERIFICATION', 'VERIFIED', 'ARCHIVED');

-- AlterTable User
ALTER TABLE "User"
ADD COLUMN "mustChangePassword" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "lastLoginAt" TIMESTAMP(3),
ADD COLUMN "failedLoginAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN "lockedUntil" TIMESTAMP(3);

-- AlterTable Product
ALTER TABLE "Product"
ADD COLUMN "modelNumber" TEXT,
ADD COLUMN "publishStatus" "ProductPublishStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN "isPublished" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "verifiedAt" TIMESTAMP(3),
ADD COLUMN "verifiedById" TEXT,
ADD COLUMN "imageUrl" TEXT;

-- CreateIndex
CREATE INDEX "Product_publishStatus_isPublished_idx" ON "Product"("publishStatus", "isPublished");

-- CreateTable SystemSetting
CREATE TABLE "SystemSetting" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "updatedBy" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemSetting_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SystemSetting_key_key" ON "SystemSetting"("key");

-- CreateTable RateLimit
CREATE TABLE "RateLimit" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 1,
    "expireAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RateLimit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RateLimit_key_key" ON "RateLimit"("key");
CREATE INDEX "RateLimit_key_expireAt_idx" ON "RateLimit"("key", "expireAt");

-- AlterTable ResourceDownload
ALTER TABLE "ResourceDownload"
ADD COLUMN "description" TEXT,
ADD COLUMN "isPublished" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable AuditLog
ALTER TABLE "AuditLog"
ADD COLUMN "adminEmail" TEXT,
ADD COLUMN "ipAddress" TEXT;

-- CreateIndex
CREATE INDEX "AuditLog_userId_createdAt_idx" ON "AuditLog"("userId", "createdAt");
CREATE INDEX "AuditLog_entityType_entityId_idx" ON "AuditLog"("entityType", "entityId");
