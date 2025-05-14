-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CaracteristicaVaga" (
    "usuarioId" TEXT NOT NULL PRIMARY KEY,
    "modeloTrabalho" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "salarioDesejadoMin" REAL NOT NULL,
    "salarioDesejadoMax" REAL NOT NULL,
    CONSTRAINT "CaracteristicaVaga_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Curriculo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "habilidades" TEXT NOT NULL,
    "softSkills" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Curriculo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Vaga" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "modeloTrabalho" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "salario" REAL NOT NULL,
    "requisitosHardSkills" TEXT NOT NULL,
    "requisitosSoftSkills" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ResultadoAnalise" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "curriculoId" TEXT NOT NULL,
    "vagaId" TEXT NOT NULL,
    "porcentagemCompatibilidade" REAL NOT NULL,
    "palavrasChaveFaltando" TEXT NOT NULL,
    "sugestoesMelhoria" TEXT NOT NULL,
    "data" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ResultadoAnalise_curriculoId_fkey" FOREIGN KEY ("curriculoId") REFERENCES "Curriculo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ResultadoAnalise_vagaId_fkey" FOREIGN KEY ("vagaId") REFERENCES "Vaga" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Candidatura" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "usuarioId" TEXT NOT NULL,
    "curriculoId" TEXT NOT NULL,
    "vagaId" TEXT NOT NULL,
    "dataCandidatura" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,
    "resultadoAnaliseId" TEXT,
    CONSTRAINT "Candidatura_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Candidatura_curriculoId_fkey" FOREIGN KEY ("curriculoId") REFERENCES "Curriculo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Candidatura_vagaId_fkey" FOREIGN KEY ("vagaId") REFERENCES "Vaga" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Candidatura_resultadoAnaliseId_fkey" FOREIGN KEY ("resultadoAnaliseId") REFERENCES "ResultadoAnalise" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Candidatura_resultadoAnaliseId_key" ON "Candidatura"("resultadoAnaliseId");
