-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Folha" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "funcionario" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "horas" INTEGER NOT NULL DEFAULT 0,
    "valor" REAL NOT NULL DEFAULT 0,
    "bruto" REAL NOT NULL DEFAULT 0,
    "liquido" REAL NOT NULL DEFAULT 0,
    "irrf" REAL NOT NULL DEFAULT 0,
    "inss" REAL NOT NULL DEFAULT 0,
    "fgts" REAL NOT NULL DEFAULT 0,
    "calculado" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Folha" ("bruto", "cpf", "fgts", "funcionario", "horas", "id", "inss", "irrf", "liquido", "valor") SELECT "bruto", "cpf", "fgts", "funcionario", "horas", "id", "inss", "irrf", "liquido", "valor" FROM "Folha";
DROP TABLE "Folha";
ALTER TABLE "new_Folha" RENAME TO "Folha";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
