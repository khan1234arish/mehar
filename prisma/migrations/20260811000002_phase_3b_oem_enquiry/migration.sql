-- MEHAR B2B Platform — Phase 3B: OEM Enquiry Schema
-- Generated: 2026-08-11
-- Adds: OemEnquiryStatus enum, OemEnquiry table with full Phase 3B
--       engineering intake fields (electrical, mechanical, BMS,
--       environmental, commercial requirements, attachment metadata,
--       company info extensions).

-- CreateEnum
CREATE TYPE "OemEnquiryStatus" AS ENUM ('NEW', 'UNDER_REVIEW', 'ENGINEERING_REVIEW', 'QUOTATION', 'CLOSED');

-- CreateTable
CREATE TABLE "OemEnquiry" (
    "id" TEXT NOT NULL,
    "enquiryNumber" TEXT NOT NULL,

    -- Company & Contact
    "companyName" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'India',
    "gstin" TEXT,
    "website" TEXT,

    -- Application
    "applicationType" TEXT NOT NULL,
    "applicationDetail" TEXT,

    -- Electrical Requirements (stored as JSON string)
    "electricalRequirements" TEXT,

    -- Mechanical Requirements (stored as JSON string)
    "mechanicalRequirements" TEXT,

    -- BMS & Communication Requirements (stored as JSON string)
    "bmsRequirements" TEXT,

    -- Environmental Requirements (stored as JSON string)
    "environmentalRequirements" TEXT,

    -- Commercial Requirements (stored as JSON string)
    "commercialRequirements" TEXT,

    -- Attachment metadata (stored as JSON array string)
    "attachmentMetadata" TEXT,

    -- Enquiry lifecycle
    "status" "OemEnquiryStatus" NOT NULL DEFAULT 'NEW',
    "internalNotes" TEXT,

    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OemEnquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OemEnquiry_enquiryNumber_key" ON "OemEnquiry"("enquiryNumber");

-- CreateIndex
CREATE INDEX "OemEnquiry_enquiryNumber_status_idx" ON "OemEnquiry"("enquiryNumber", "status");
