import prismaClient from '../../prisma';

interface EditarEnderecoDTO {
  enderecoId: string;
  usuarioId: string; // Para garantir que o endereço pertence ao usuário
  rua?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  cep?: string;
  complemento?: string;
  padrao?: boolean;
  latitude?: number;
  longitude?: number;
}

class EditarEnderecoUserService {
  async execute(data: EditarEnderecoDTO) {
    const { enderecoId, usuarioId, ...fields } = data;

    // Busca o endereço e garante que o usuarioId bate
    const endereco = await prismaClient.endereco.findUnique({
      where: { id: enderecoId },
    });
    if (!endereco) {
      throw new Error('Endereço não encontrado');
    }
    if (endereco.usuarioId !== usuarioId) {
      throw new Error('Acesso negado: este endereço não pertence ao usuário');
    }
    if (endereco.deletedAt) {
      throw new Error('Este endereço foi removido');
    }

    // Monta o objeto de update (apenas campos fornecidos)
    const updateData: any = {};
    if (fields.rua !== undefined) updateData.rua = fields.rua;
    if (fields.numero !== undefined) updateData.numero = fields.numero;
    if (fields.bairro !== undefined) updateData.bairro = fields.bairro;
    if (fields.cidade !== undefined) updateData.cidade = fields.cidade;
    if (fields.cep !== undefined) updateData.cep = fields.cep;
    if (fields.complemento !== undefined) updateData.complemento = fields.complemento;
    if (fields.padrao !== undefined) updateData.padrao = fields.padrao;
    if (fields.latitude !== undefined) updateData.latitude = fields.latitude;
    if (fields.longitude !== undefined) updateData.longitude = fields.longitude;

    const enderecoAtualizado = await prismaClient.endereco.update({
      where: { id: enderecoId },
      data: updateData,
    });

    return enderecoAtualizado;
  }
}

export { EditarEnderecoUserService };
