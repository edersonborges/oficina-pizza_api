import prismaClient from '../../prisma';

interface EditarAdicionalDTO {
  id: string;
  nome?: string;
  valor?: number;
  qntd_min?: number;
  qntd_max?: number;
}

class EditarAdicionalService {
  async execute({ id, nome, valor, qntd_min, qntd_max }: EditarAdicionalDTO) {
    const adicional = await prismaClient.adicionais.findUnique({ where: { id } });
    if (!adicional) {
      throw new Error('Adicional não encontrado');
    }
    const updatedAdicional = await prismaClient.adicionais.update({
      where: { id },
      data: {
        nome: nome || adicional.nome,
        valor: valor !== undefined ? valor : adicional.valor,
        qntd_min: qntd_min !== undefined ? qntd_min : adicional.qntd_min,
        qntd_max: qntd_max !== undefined ? qntd_max : adicional.qntd_max,
      },
    });
    return { message: 'Adicional atualizado com sucesso', updatedAdicional };
  }
}

export { EditarAdicionalService };
