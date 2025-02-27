import prismaClient from '../../prisma';

interface HorarioDTO {
  diaSemana: number;       // de 1 a 7 (domingo=1, segunda=2, ..., sábado=7)
  horaAbertura?: string;   // ISO string, opcional
  horaFechamento?: string; // ISO string, opcional
  aberto?: boolean;        // opcional
}

interface EditarHorariosDTO {
  lojaId: string;
  horarios: HorarioDTO[];
}

class EditarHorariosService {
  async execute(data: EditarHorariosDTO) {
    const { lojaId, horarios } = data;

    if (!horarios || horarios.length === 0) {
      throw new Error("Nenhum horário fornecido");
    }

    // Executa a operação em transação para garantir integridade
    const resultados = await prismaClient.$transaction(async (prisma) => {
      const res: any[] = [];

      for (const horario of horarios) {
        // Valida se o diaSemana está entre 1 e 7
        if (horario.diaSemana < 1 || horario.diaSemana > 7) {
          throw new Error("O valor de diaSemana deve estar entre 1 e 7");
        }

        // Verifica se já existe um registro para este dia e loja
        const horarioExistente = await prisma.horarioFuncionamento.findFirst({
          where: {
            lojaId,
            diaSemana: horario.diaSemana,
          },
        });

        if (horarioExistente) {
          // Atualiza o registro existente
          const atualizado = await prisma.horarioFuncionamento.update({
            where: { id: horarioExistente.id },
            data: {
              horaAbertura: horario.horaAbertura ? new Date(horario.horaAbertura) : horarioExistente.horaAbertura,
              horaFechamento: horario.horaFechamento ? new Date(horario.horaFechamento) : horarioExistente.horaFechamento,
              aberto: horario.aberto !== undefined ? horario.aberto : horarioExistente.aberto,
            },
          });
          res.push(atualizado);
        } else {
          // Cria um novo registro para o dia
          const criado = await prisma.horarioFuncionamento.create({
            data: {
              lojaId,
              diaSemana: horario.diaSemana,
              horaAbertura: horario.horaAbertura ? new Date(horario.horaAbertura) : null,
              horaFechamento: horario.horaFechamento ? new Date(horario.horaFechamento) : null,
              aberto: horario.aberto !== undefined ? horario.aberto : true,
            },
          });
          res.push(criado);
        }
      }
      return res;
    });

    return resultados;
  }
}

export { EditarHorariosService };
