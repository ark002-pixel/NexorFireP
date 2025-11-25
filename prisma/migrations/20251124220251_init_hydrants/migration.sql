-- CreateTable
CREATE TABLE "Hydrant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "address" TEXT,
    "status" TEXT NOT NULL,
    "flowRate" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "HydrantInspection" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "hydrantId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "flowRate" INTEGER,
    "pressure" INTEGER,
    "notes" TEXT,
    "inspectorId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "HydrantInspection_hydrantId_fkey" FOREIGN KEY ("hydrantId") REFERENCES "Hydrant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
