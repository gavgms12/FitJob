-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CaracteristicaVaga" (
    "usuarioId" TEXT NOT NULL,
    "modeloTrabalho" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "salarioDesejadoMin" DOUBLE PRECISION NOT NULL,
    "salarioDesejadoMax" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CaracteristicaVaga_pkey" PRIMARY KEY ("usuarioId")
);

-- CreateTable
CREATE TABLE "Curriculo" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "habilidades" TEXT[],
    "softSkills" TEXT[],
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Curriculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vaga" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "modeloTrabalho" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "salario" DOUBLE PRECISION NOT NULL,
    "requisitosHardSkills" TEXT[],

    CONSTRAINT "Vaga_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResultadoAnalise" (
    "id" TEXT NOT NULL,
    "curriculoId" TEXT NOT NULL,
    "vagaId" TEXT NOT NULL,
    "candidaturaId" TEXT NOT NULL,
    "porcentagemCompatibilidade" DOUBLE PRECISION NOT NULL,
    "palavrasChaveFaltando" TEXT[],
    "sugestoesMelhoria" TEXT[],
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ResultadoAnalise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Candidatura" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "curriculoId" TEXT NOT NULL,
    "vagaId" TEXT NOT NULL,
    "dataCandidatura" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL,

    CONSTRAINT "Candidatura_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "CaracteristicaVaga" ADD CONSTRAINT "CaracteristicaVaga_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curriculo" ADD CONSTRAINT "Curriculo_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultadoAnalise" ADD CONSTRAINT "ResultadoAnalise_curriculoId_fkey" FOREIGN KEY ("curriculoId") REFERENCES "Curriculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultadoAnalise" ADD CONSTRAINT "ResultadoAnalise_vagaId_fkey" FOREIGN KEY ("vagaId") REFERENCES "Vaga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResultadoAnalise" ADD CONSTRAINT "ResultadoAnalise_candidaturaId_fkey" FOREIGN KEY ("candidaturaId") REFERENCES "Candidatura"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidatura" ADD CONSTRAINT "Candidatura_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidatura" ADD CONSTRAINT "Candidatura_curriculoId_fkey" FOREIGN KEY ("curriculoId") REFERENCES "Curriculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Candidatura" ADD CONSTRAINT "Candidatura_vagaId_fkey" FOREIGN KEY ("vagaId") REFERENCES "Vaga"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
